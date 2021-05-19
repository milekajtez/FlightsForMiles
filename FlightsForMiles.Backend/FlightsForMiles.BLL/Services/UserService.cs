using FlightsForMiles.BLL.Contracts.DTO.User;
using FlightsForMiles.BLL.Contracts.Services.User;
using FlightsForMiles.BLL.Model.User;
using FlightsForMiles.BLL.ResponseDTO.User;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #region 1 - Add (User registration)
        public long AddUser(IUserRequestDTO userRequestDTO)
        {
            if (userRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(userRequestDTO));
            }

            IUser user = ConvertRequestObjectToUser(userRequestDTO);
            return _userRepository.AddUser(user).Result;
        }
        #endregion
        #region 2 - Confirm registration
        public void ConfirmRegistration(string username)
        {
            if (!_userRepository.ConfirmRegistration(username).Result) 
            {
                throw new Exception("Confirm unsuccessfully becouse user is not found or current user already confirm his registration");
            }
        }
        #endregion
        #region 3 - Get (Load one user)
        public IUserResponseDTO LoadUser(long id)
        {
            return ConvertUserToResponseObject(_userRepository.LoadUser(id).Result);
        }
        #endregion
        #region 4 - User login
        public object UserLogin(ILoginUserRequestDTO loginUserRequestDTO)
        {
            if (loginUserRequestDTO == null) 
            {
                throw new ArgumentNullException(nameof(loginUserRequestDTO));
            }

            return _userRepository.LoginUser(ConvertLoginRequestToLoginUser(loginUserRequestDTO)).Result;
        }
        #endregion
        #region 5 - User google login
        public object UserGoogleLogin(IGoogleLoginUserRequestDTO googleLoginUserRequestDTO) 
        {
            if (googleLoginUserRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(googleLoginUserRequestDTO));
            }

            return _userRepository.GoogleLoginUser(ConvertGoogleLoginRequestToGoogleLoginUser(googleLoginUserRequestDTO));
        }
        #endregion
        #region 6 - Avio admin registration
        public long AddAvioAdmin(IAvioAdminRequestDTO avioAdminRequestDTO)
        {
            if (avioAdminRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(avioAdminRequestDTO));
            }

            IAvioAdmin avioAdmin = ConvertRequestObjectToAvioAdmin(avioAdminRequestDTO);
            return _userRepository.AddAvioAdmin(avioAdmin).Result; 
        }
        #endregion
        #region 7 - Methods for change passwrd for first login of avio admin
        public void ChangePass(string pin, string password)
        {
            NewPassValidation(pin, password);
            if (!_userRepository.ChangePass(pin, password).Result) 
            {
                throw new ArgumentException("User with entered pin doesn't exsist.");
            }
        }

        private void NewPassValidation(string pin, string newPass) 
        {
            if (string.IsNullOrWhiteSpace(pin)) 
            {
                throw new ArgumentNullException(nameof(pin));
            }

            if (string.IsNullOrWhiteSpace(newPass)) 
            {
                throw new ArgumentNullException(nameof(pin));
            }

            if (!long.TryParse(pin, out _)) 
            {
                throw new ArgumentException(nameof(pin));
            }

            if (newPass.Length < 8) 
            {
                throw new ArgumentException(nameof(newPass), "New password must has minimum 8 characters.");
            }
        }
        #endregion
        #region 8 - Method for load user profile data
        public IProfileDataResponseDTO LoadUserProfileData(string username)
        {
            return ConvertProfileDataToResponseObject(_userRepository.LoadUserProfileData(username).Result);
        }
        #endregion

        #region Converting methods
        private IUserResponseDTO ConvertUserToResponseObject(IUser user)
        {
            return new UserResponseDTO()
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Pin = user.Pin,
                Address = user.Address,
                Telephone = user.Telephone,
                Passport = user.Passport,
                Points = user.Points.ToString()
            };
        }
        private IUser ConvertRequestObjectToUser(IUserRequestDTO userRequestDTO)
        {
            return new User(userRequestDTO.Username, userRequestDTO.Email, userRequestDTO.Password, 
                userRequestDTO.Firstname, userRequestDTO.Lastname, userRequestDTO.Pin, userRequestDTO.Address, 
                userRequestDTO.Telephone, userRequestDTO.Passport, 0);
        }

        private ILoginUser ConvertLoginRequestToLoginUser(ILoginUserRequestDTO loginUserRequestDTO) 
        {
            return new LoginUser(loginUserRequestDTO.Username, loginUserRequestDTO.Password);
        }

        private IGoogleLoginUser ConvertGoogleLoginRequestToGoogleLoginUser(IGoogleLoginUserRequestDTO googleLoginUserRequestDTO)
        {
            return new GoogleLoginUser(googleLoginUserRequestDTO.IdToken);
        }

        private IAvioAdmin ConvertRequestObjectToAvioAdmin(IAvioAdminRequestDTO avioAdminRequestDTO) 
        {
            return new AvioAdmin(avioAdminRequestDTO.Username, avioAdminRequestDTO.Email, avioAdminRequestDTO.Password, avioAdminRequestDTO.Pin,
                avioAdminRequestDTO.Telephone);
        }

        private IProfileDataResponseDTO ConvertProfileDataToResponseObject(IProfileData profileData) 
        {
            return new ProfileDataResponseDTO()
            {
                Username = profileData.Username,
                Type = profileData.Type,
                Telephone = profileData.Telephone,
                Email = profileData.Email,
                Points = profileData.Points,
                Firstname = profileData.Firstname,
                Lastname = profileData.Lastname,
                Pin = profileData.Pin,
                Address = profileData.Address,
                Passport = profileData.Passport
            };
        }
        #endregion
    }
}
