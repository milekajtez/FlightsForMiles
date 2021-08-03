using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Pkcs;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace FlightsForMiles.DAL.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly UserManager<RegisteredUser> _userManager;
        private readonly ApplicationDbContext _context;
        public BookingRepository(ApplicationDbContext context, UserManager<RegisteredUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        #region 1 - Method for booking without friends
        public async Task<bool> BookingWithoutFriends(IBookingWithoutFriends bookingWithoutFriends)
        {
            var user = await _userManager.FindByNameAsync(bookingWithoutFriends.Username);
            if (user == null)
            {
                throw new ArgumentException("Server not found user.");
            }
            var flight = _context.Flights.Find(int.Parse(bookingWithoutFriends.FlightID));
            if (flight == null) 
            {
                throw new ArgumentException("Server not found flight.");
            }
            var ticket = _context.Tickets.Find(int.Parse(bookingWithoutFriends.TicketID));
            if (ticket == null)
            {
                throw new ArgumentException("Server not found ticket.");
            }

            // provera da li postoji vec booking sa zadatim parametrima
            var bookings = _context.Bookings;
            foreach (var book in bookings) 
            {
                if (book.FlightID.Equals(int.Parse(bookingWithoutFriends.FlightID)) && 
                    book.TicketID.Equals(bookingWithoutFriends.TicketID)) 
                {
                    throw new ArgumentException("User has already send request for booking for this flght and seat.");
                }
            }

            //ticket amount
            double ticketPrice = ticket.Price / LoadBitcoinExchangeRates().Result;

            //load keys
            Tuple<RsaKeyParameters, RsaKeyParameters> keys = GetKeys(user.UserName);

            //make new transaction
            Transaction newTransaction = new Transaction()
            {
                Id = Guid.NewGuid(),
                Amount = ticketPrice,
                Fees = 0.0006,
                IsValid = false,
                Block = null,
                SenderPublicKey = user.UserName,
                RecipientPublicKey = "mainAdmin",
                Signature = GenerateSignature(user.UserName, "mainAdmin", ticketPrice, bookingWithoutFriends.TicketID, keys)
            };

            Booking newBooking = new Booking()
            {
                UserID = user.Id,
                FlightID = int.Parse(bookingWithoutFriends.FlightID),
                TicketID = bookingWithoutFriends.TicketID,
                BookingStatus = "WAITING",
                Price = 0,
                DiscountPrice = 0,
                TransactionID = newTransaction.Id
            };

            await _context.Transactions.AddAsync(newTransaction);       // add transaction
            await _context.Bookings.AddAsync(newBooking);               // add booking
            await _context.SaveChangesAsync();                          // save changes
            return true;
        }
        #endregion

        #region Method for getting keys
        private Tuple<RsaKeyParameters, RsaKeyParameters> GetKeys(string username)
        {
            string fileNamePrivate = "users\\private\\" + username + ".txt";
            string fileNamePublic = "users\\public\\" + username + ".txt";

            string privateKeyString = LoadKeyPair(fileNamePrivate);
            string publicKeyString = LoadKeyPair(fileNamePublic);

            
            TextReader textReaderPUB = new StringReader(publicKeyString);
            PemReader pemReaderPUB = new PemReader(textReaderPUB);
            RsaKeyParameters publicKeyRestored = (RsaKeyParameters)pemReaderPUB.ReadObject();

            TextReader textReaderPRIV = new StringReader(privateKeyString);
            PemReader pemReaderPRIV = new PemReader(textReaderPRIV);
            var o = pemReaderPRIV.ReadObject();
            AsymmetricCipherKeyPair keyPair = (AsymmetricCipherKeyPair)o;

            RsaKeyParameters privateKeyRestored = (RsaKeyParameters)keyPair.Private;


            return new Tuple<RsaKeyParameters, RsaKeyParameters>(privateKeyRestored, publicKeyRestored);
        }
        #endregion
        #region Method for load key pair from file 
        private string LoadKeyPair(string fileName)
        {
            using StreamReader sr = new StreamReader(fileName);
            return sr.ReadToEnd();
        }
        #endregion
        #region Method for loading current bitcoin exchange rates
        private async Task<double> LoadBitcoinExchangeRates()
        {
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Get, @"https://coinmarketcap.com/currencies/bitcoin/")
            {
                Content = new StringContent(string.Empty, Encoding.UTF8, "application/json")
            };
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.SendAsync(httpRequest);
            var result = response.Content.ReadAsStringAsync().Result;

            if (result.Contains("priceValue___11gHJ "))
            {
                int index = result.IndexOf("priceValue___11gHJ ");
                string currentBitcoinValue = result.Substring(index, 37).Split('$')[1].Split('<')[0];

                
                return double.Parse(currentBitcoinValue);
            }
            else
            {
                throw new Exception("Loading exchange unsuccessfully.");
            }
        }
        #endregion
        #region Method for generate signature
        private string GenerateSignature(string sender, string receiver, double amount,
            string ticketID, Tuple<RsaKeyParameters, RsaKeyParameters> keys)
        {
            byte[] tmpSource = ASCIIEncoding.ASCII.GetBytes(sender + "|" + receiver + "|" + amount.ToString()
                 + "|" + ticketID);
            ISigner sign = SignerUtilities.GetSigner(PkcsObjectIdentifiers.Sha1WithRsaEncryption.Id);
            sign.Init(true, keys.Item1);
            sign.BlockUpdate(tmpSource, 0, tmpSource.Length);
            byte[] signature = sign.GenerateSignature();
            return ByteArrayToString(signature);
        }
        #endregion
        #region Method for convert byte array to string
        private string ByteArrayToString(byte[] arrInput) 
        {
            StringBuilder sOutput = new StringBuilder(arrInput.Length);
            for (int i = 0; i < arrInput.Length; i++) 
            {
                sOutput.Append(arrInput[i].ToString("X").ToLower());
            }

            return sOutput.ToString();
        }
        #endregion
    }
}
