using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
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

            var bookings = _context.Bookings;
            foreach (var book in bookings) 
            {
                if (book.UserID.Equals(user.Id) && book.FlightID.Equals(int.Parse(bookingWithoutFriends.FlightID))
                    && book.TicketID.Equals(int.Parse(bookingWithoutFriends.TicketID))) 
                {
                    throw new ArgumentException("User has already send request for booking for this flght and seat.");
                }
            }

            //ticket amount
            double ticketPrice = ticket.Price / LoadBitcoinExchangeRates(ticket.Price).Result;

            //load keys
            RSACryptoServiceProvider rsa = GetKeys(user.UserName);

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
                Signature = GenerateSignature(user.UserName, "mainAdmin", ticketPrice, rsa)
            };
            await _context.Transactions.AddAsync(newTransaction);

            Booking newBooking = new Booking()
            {
                UserID = user.Id,
                FlightID = int.Parse(bookingWithoutFriends.FlightID),
                TicketID = int.Parse(bookingWithoutFriends.TicketID),
                BookingStatus = "WAITING"
            };
            await _context.Bookings.AddAsync(newBooking);

            await _context.SaveChangesAsync();

            return true;
        }
        #endregion

        #region Kod koji ce mi verovatno trebati dok budem radio enkripciju/dekripciju



        //ovo mi treba za transakciju
        /// <summary>
        /// Id ----------------------------- transaction ID
        /// Amount ------------------------- amount in transaction (prive of booking)
        /// RecipientPublicKey ------------- recipent public key
        /// SenderPublicKey ---------------- sender public key
        /// Signature ---------------------- transaction's siganture
        /// Fees --------------------------- fees for adding transaction to blockchin
        /// IsValid ------------------------ is transaction valid?---bice false
        /// Block -------------------------- transaction is in this block
        /// 
        // ubaciti u balances nocu kolonu koja ce biti waiting
        // nabavka kljuceva
        //RSACryptoServiceProvider rsa = GetKeys(user.UserName);
        /*var sw = new StringWriter();
        var xsPublic = new XmlSerializer(typeof(RSAParameters));
        xsPublic.Serialize(sw, publicKey);
        var xsPrivate = new XmlSerializer(typeof(RSAParameters));
        xsPrivate.Serialize(sw, privateKey);*/




        /*RSAParameters publicKey = csp.ToXmlString(false);
            RSAParameters privateKey = csp.ExportParameters(true);

            string www = publicKey.ToString();
            //publicKey = (RSAParameters)www;

            var sw = new StringWriter();
            var xsPublic = new XmlSerializer(typeof(RSAParameters));
            xsPublic.Serialize(sw, publicKey);
            var xsPrivate = new XmlSerializer(typeof(RSAParameters));
            xsPrivate.Serialize(sw, privateKey);

            csp.ImportParameters(publicKey);
            var data = Encoding.Unicode.GetBytes("Ja sam MIle.");
            var cypher = csp.Encrypt(data, false);

            var encripted = Convert.ToBase64String(cypher);

            var dataBase = Convert.FromBase64String(encripted);
            csp.ImportParameters(privateKey);
            var plainText = csp.Decrypt(dataBase, false);
            var deciripted = Encoding.Unicode.GetString(plainText);

            //enkripcija i dekripcija rade...sad te kljuceve treba smestiti u bazu / scriptu
            return new Tuple<string, string>(xsPublic.ToString(), xsPrivate.ToString());*/
        #endregion

        #region Method for getting keys
        private RSACryptoServiceProvider GetKeys(string username)
        {
            string fileName = "users\\" + username + ".txt";
            string resultKeys = LoadKeyPair(fileName);
            RSACryptoServiceProvider csp = new RSACryptoServiceProvider(2048);
            csp.FromXmlString(resultKeys);
            return csp;
        }
        #endregion
        #region Method for load key pair from file 
        private string LoadKeyPair(string fileName)
        {
            using StreamReader sr = new StreamReader(fileName);
            return sr.ReadLine();
        }
        #endregion
        #region Method for loading current bitcoin exchange rates
        private async Task<double> LoadBitcoinExchangeRates(double price)
        {
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Get, @"https://coinmarketcap.com/currencies/bitcoin/");
            httpRequest.Content = new StringContent(string.Empty, Encoding.UTF8, "application/json");
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
        private string GenerateSignature(string sender, string receiver, double amount, RSACryptoServiceProvider rsa)
        { 
            string informations = sender + "|" + receiver + "|" + amount.ToString();
            var cypher = rsa.Encrypt(Encoding.Unicode.GetBytes(informations), false);
            var siganture = Convert.ToBase64String(cypher);
            return siganture;
        }
        #endregion
    }
}
