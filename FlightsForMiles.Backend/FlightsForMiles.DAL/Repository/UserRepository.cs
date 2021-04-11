using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.login_and_registration;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<RegisteredUser> _userManager;
        private readonly ApplicationSettings _appSettings;
        private readonly MailSettings _mailSettings;
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        public UserRepository(UserManager<RegisteredUser> userManager, IOptions<ApplicationSettings> appSettings,
            IOptions<MailSettings> mailSettings)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _mailSettings = mailSettings.Value;
        }

        #region 1 - Add user (Registration user)
        public async Task<long> AddUser(IUser newUser)
        {
            if (newUser.Username.Equals("mainAdmin"))
            {
                throw new ArgumentException("Entered username has been reserved already.");
            }

            var resultFind = await _userManager.FindByIdAsync(newUser.Pin);
            if (resultFind == null)
            {
                RegisteredUser registeredUser = new RegisteredUser()
                {
                    Id = newUser.Pin,
                    UserName = newUser.Username,
                    Email = newUser.Email,
                    FirstName = newUser.Firstname,
                    LastName = newUser.Lastname,
                    Address = newUser.Address,
                    PhoneNumber = newUser.Telephone,
                    NumberOfPassport = newUser.Passport,
                    IsNewReservation = true,
                    Points = newUser.Points
                };

                await _userManager.CreateAsync(registeredUser, newUser.Password);
                await SendEmailAsync(registeredUser.UserName, registeredUser.Email, registeredUser.PhoneNumber);
                return long.Parse(registeredUser.Id);
            }
            else
            {
                throw new Exception("Please enter a different personal identify number.");
            }
        }
        #endregion
        #region 2 - Method for sending E-mail
        public async Task SendEmailAsync(string username, string mailID, string telephone)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress(_mailSettings.Mail, _mailSettings.DisplayName);
            message.To.Add(new MailAddress(mailID));
            message.Subject = "Confirm registration";
            message.Priority = MailPriority.Normal;

            message.IsBodyHtml = false;
            message.Body = "Hello " + username + "! You successful registred on FlightsForMiles application." +
                "If you telephone number is '" + telephone.ToString() + "', please confirm registration on this link:" +
                "http://localhost:3000/confirmRegYes/" + username;
            smtp.Port = _mailSettings.Port;
            smtp.Host = _mailSettings.Host;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            await smtp.SendMailAsync(message);
        }
        #endregion
        #region 3 - Confirm registration
        public async Task<bool> ConfirmRegistration(string username)
        {
            var resultFind = await _userManager.FindByNameAsync(username);
            if (resultFind != null && resultFind.IsNewReservation)
            {
                resultFind.IsNewReservation = false;
                await _userManager.UpdateAsync(resultFind);

                await _userManager.AddClaimAsync(resultFind, new Claim(ClaimTypes.Role, "regular_user"));
                await _userManager.AddClaimAsync(resultFind, new Claim(ClaimTypes.PrimarySid, resultFind.Id));
                await _userManager.AddToRoleAsync(resultFind, "regular_user");

                /*
                    Kada sam izvrsio update novog korisnika tj potvrdio rezervaciju preko mejla,
                    ubacujem odredjene informacije o samom korisniku (UserID kao i njegovu vrstu tj ulogu u sistemu).
                    Takodje ubacujem i podatke u tabelu koja predsatvlja vezu korisnika sa svojom ulogom u sistemu.
                    Pri logovanju, korisniku se dodeljuje token. Ono sto ce se odraditi jeste da ce se napraviti claim-ovi
                    u kojima ce biti informacije koje ce se izvlaciti iz spomenutih tabela i tako kreirani claim-ovi
                    ce se ubacii u token. Na taj nacin cemo u tokenu imati informcije od interesa o korisniku.
                    Ukoliko token instekne, korisnik se ponovo loguje i ponovo dobija novi token, a postupak
                    kreirnja claim-ova se ponavlja.
                */

                return true;
            }

            return false;
        }
        #endregion
        #region 4 - Load one user
        public async Task<IUser> LoadUser(long id)
        {
            RegisteredUser registeredUser = await _userManager.FindByIdAsync(id.ToString());
            IUser user = new UserDataModel()
            {
                Pin = registeredUser.Id,
                Username = registeredUser.UserName,
                Email = registeredUser.Email,
                Password = registeredUser.PasswordHash,
                Firstname = registeredUser.FirstName,
                Lastname = registeredUser.LastName,
                Address = registeredUser.Address,
                Telephone = registeredUser.PhoneNumber,
                Passport = registeredUser.NumberOfPassport,
                Points = registeredUser.Points
            };

            return user ?? null;
            throw new NotImplementedException();
        }
        #endregion
        #region 5 - User login
        public async Task<object> LoginUser(ILoginUser loginUser)
        {
            var user = await _userManager.FindByNameAsync(loginUser.Username);
            if (user == null)
            {
                throw new ArgumentException("Username is incorrect.");
            }
            else if (await _userManager.CheckPasswordAsync(user, loginUser.Password) == false)
            {
                throw new ArgumentException("Password is incorrect.");
            }
            else if (user.IsNewReservation == true)
            {
                throw new InvalidOperationException("Please go to your mail accont and confirm you registration.");
            }
            else 
            {
                var claims = await _userManager.GetClaimsAsync(user);
                claims.Add(new Claim("FirstLogin", user.FirstLogin.ToString()));        // claim for avio admin

                // define tokens
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature),
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return new { token };
            }
        }
        #endregion
        #region 6 - User google login
        public object GoogleLoginUser(IGoogleLoginUser googleLoginUser) 
        {
            string userID = VerifyGoogleToken(googleLoginUser.IdToken).Result;
            if (!userID.Equals(""))
            {
                // token is invalid and I make new
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature),
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Role, "regular_user"),
                        new Claim(ClaimTypes.PrimarySid, userID)
                    }),
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return new { token };
            }

            throw new InvalidOperationException("Login via google unsuccessfully.");
        }
        #endregion
        #region 7 - Methos for token (google login) validation
        public async Task<string> VerifyGoogleToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch
            {
                return "";
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return "";
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            var resultFind = await _userManager.FindByIdAsync(googleApiTokenInfo.Sub.ToString());
            if (resultFind == null)
            {
                // ne postoji korisnik i ubacujem ga u bazu
                RegisteredUser registeredUser = new RegisteredUser()
                {
                    UserName = googleApiTokenInfo.Name,
                    Email = googleApiTokenInfo.Email,
                    FirstName = googleApiTokenInfo.Given_name,
                    LastName = googleApiTokenInfo.Family_name,
                    Id = googleApiTokenInfo.Sub/*.Substring(0, 13)*/,
                    Address = "",
                    PhoneNumber = "",
                    NumberOfPassport = "",
                    IsNewReservation = false,
                    Points = 0
                };

                try
                {
                    var result = await _userManager.CreateAsync(registeredUser);
                    return googleApiTokenInfo.Sub;      // return new id
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return resultFind.Id;
        }
        #endregion
    }
}
