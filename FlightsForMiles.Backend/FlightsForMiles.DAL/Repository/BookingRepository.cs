using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.booking;
using FlightsForMiles.DAL.DataModel.login_and_registration;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Asn1.Pkcs;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
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
        private readonly MailSettings _mailSettings;
        public BookingRepository(ApplicationDbContext context, UserManager<RegisteredUser> userManager,
            IOptions<MailSettings> mailSettings)
        {
            _context = context;
            _userManager = userManager;
            _mailSettings = mailSettings.Value;
        }

        #region 1 - Method for booking without friends
        public async Task<string> BookingWithoutFriends(IBookingWithoutFriends bookingWithoutFriends)
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
            double ticketPrice = ticket.Price * LoadBitcoinExchange();

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
                Signature = GenerateSignature(user.UserName, "mainAdmin", ticketPrice, bookingWithoutFriends.TicketID, keys),
                BookingFrom = user.UserName
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
            return newTransaction.Id.ToString();
        }
        #endregion
        #region 2 - Method for booking for friends
        public async Task<bool> BookingForFriends(IBookingForFriends bookingForFriends)
        {
            var user = await _userManager.FindByNameAsync(bookingForFriends.Username);
            if (user == null)
            {
                throw new ArgumentException("Server not found user.");
            }
            var flight = _context.Flights.Find(int.Parse(bookingForFriends.FlightID));
            if (flight == null)
            {
                throw new ArgumentException("Server not found flight.");
            }

            bool ticketExsist;
            var tickets = _context.Tickets;
            for (int i = 0; i < bookingForFriends.TicketsID.Count; i++)
            {
                ticketExsist = false;

                foreach (var ticket in tickets) 
                {
                    if (ticket.Id == int.Parse(bookingForFriends.TicketsID[i])) 
                    {
                        ticketExsist = true;
                        break;
                    }
                }

                if (!ticketExsist)
                {
                    throw new ArgumentException("Server not found ticket.");
                }
            }

            bool friendsExsist;
            var users = _context.RegisteredUsers;
            for (int i = 0; i < bookingForFriends.Friends.Count; i++)
            {
                friendsExsist = false;

                foreach (var friend in users)
                {
                    if (friend.UserName == bookingForFriends.Friends[i])
                    {
                        friendsExsist = true;
                        break;
                    }
                }

                if (!friendsExsist)
                {
                    throw new ArgumentException("Server not found friend.");
                }
            }

            // Has booking already exsisted
            var bookings = _context.Bookings;
            for (int i = 0; i < bookingForFriends.Friends.Count; i++) 
            {
                foreach (var book in bookings)
                {
                    if (book.FlightID.Equals(int.Parse(bookingForFriends.FlightID)) &&
                        book.TicketID.Equals(bookingForFriends.TicketsID[i]))
                    {
                        throw new ArgumentException("User has already send request for booking for this flght and seat.");
                    }
                }
            }

            //tickets amount
            List<double> ticketPrices = new List<double>();
            foreach (var ticketID in bookingForFriends.TicketsID) 
            {
                var ticket = _context.Tickets.Find(int.Parse(ticketID));
                ticketPrices.Add(ticket.Price * LoadBitcoinExchange());
            }

            //load keys for all friends
            List<Tuple<RsaKeyParameters, RsaKeyParameters>> usersKeys = new List<Tuple<RsaKeyParameters, RsaKeyParameters>>();
            foreach (var friend in bookingForFriends.Friends) 
            {
                usersKeys.Add(GetKeys(friend));
            }

            //make new transaction
            List<Transaction> newTransactions = new List<Transaction>();
            for (int i = 0; i < ticketPrices.Count; i++) 
            {
                newTransactions.Add(new Transaction() 
                {
                    Id = Guid.NewGuid(),
                    Amount = ticketPrices[i],
                    Fees = 0.0006,
                    IsValid = false,
                    Block = null,
                    SenderPublicKey = bookingForFriends.Friends[i],
                    RecipientPublicKey = "mainAdmin",
                    Signature = GenerateSignature(bookingForFriends.Friends[i], "mainAdmin", ticketPrices[i], bookingForFriends.TicketsID[i], usersKeys[i]),
                    BookingFrom = bookingForFriends.Username
                });
            }

            //make new bookings
            List<Booking> newBookings = new List<Booking>();
            for (int i = 0; i < newTransactions.Count; i++) 
            {
                Booking newBooking = new Booking()
                {
                    UserID = (await _userManager.FindByNameAsync(bookingForFriends.Friends[i])).Id,
                    FlightID = int.Parse(bookingForFriends.FlightID),
                    TicketID = bookingForFriends.TicketsID[i],
                    BookingStatus = "WAITING",
                    Price = 0,
                    DiscountPrice = 0,
                    TransactionID = newTransactions[i].Id
                };
                newBookings.Add(newBooking);

                // kada se za svakog definise booking i transaction..salje se mejl tom korisniku
                await SendEmailAsync(bookingForFriends.Username, bookingForFriends.Friends[i],
                    (await _userManager.FindByNameAsync(bookingForFriends.Friends[i])).Email,
                    bookingForFriends.FlightID, bookingForFriends.TicketsID[i], newBooking.TransactionID);
            }

            await _context.Transactions.AddRangeAsync(newTransactions);     // add transaction
            await _context.Bookings.AddRangeAsync(newBookings);             // add booking
            await _context.SaveChangesAsync();                              // save changes
            return true;

        }
        #endregion
        #region 3 - Method for confirm booking resrevation
        public async Task<bool> ConfirmBookingRequest(string ticketID)
        {
            var bookings = _context.Bookings;
            Guid transactionID = Guid.NewGuid();
            bool findTransactionID = false;
            foreach (var book in bookings) 
            {
                if (book.TicketID.Equals(ticketID)) 
                {
                    transactionID = book.TransactionID;
                    findTransactionID = true;
                    break;
                }
            }

            if (!findTransactionID) 
            {
                throw new Exception("Server not found booking with entered ticketID");
            }

            var transactions = _context.Transactions;
            foreach (var trans in transactions) 
            {
                if (trans.Id.Equals(transactionID)) 
                {
                    trans.BookingFrom = trans.SenderPublicKey;
                    break;
                }
            }

            _context.UpdateRange(transactions);
            await _context.SaveChangesAsync();
            return true;
        }
        #endregion
        #region 4 - Method for refuse booking reservation
        public async Task<bool> RefuseBookingRequest(string ticketID)
        {
            var bookings = _context.Bookings;
            Guid transactionID = Guid.NewGuid();
            Booking booking = null;
            foreach (var book in bookings)
            {
                if (book.TicketID.Equals(ticketID))
                {
                    booking = book;
                    transactionID = book.TransactionID;
                    break;
                }
            }

            if (booking == null)
            {
                throw new Exception("Server not found booking with entered ticketID");
            }

            Transaction transaction = null;
            var transactions = _context.Transactions;
            foreach (var trans in transactions)
            {
                if (trans.Id.Equals(transactionID))
                {
                    transaction = trans;
                    break;
                }
            }

            if (transaction == null)
            {
                throw new Exception("Server not found transaction with entered ticketID");
            }

            _context.Bookings.Remove(booking);
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;

        }
        #endregion
        #region 5 - Method for load quick bookings
        public async Task<List<IQuickBooking>> LoadQuickBookings(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) 
            {
                throw new Exception("Server not found user.");
            }

            var tickets = _context.Tickets.Include(f => f.Flight);
            List<IQuickBooking> quickBookings = new List<IQuickBooking>();

            foreach (var ticket in tickets) 
            {
                if (ticket.Is_quick_booking && !ticket.Is_ticket_purchased) 
                {
                    quickBookings.Add(new QuickBookingDataModel() 
                    {
                        TicketID = ticket.Id.ToString(),
                        FlightID = ticket.Flight.Id.ToString(),
                        StartLocation = ticket.Flight.Start_location,
                        EndLocation = ticket.Flight.End_location,
                        StartTime = ticket.Flight.Start_time.ToString(),
                        EndTime = ticket.Flight.End_time.ToString(),
                        TicketNumber = ticket.Number_of_seat.ToString(),
                        OriginalPrice = ticket.Price.ToString(),
                        DiscountPrice = CaluclateQuickBookingDiscount(ticket.Price).ToString(),
                        OriginalBitcoinPrice = (ticket.Price * LoadBitcoinExchange()).ToString(),
                        DiscountBitcoinPrice = CaluclateQuickBookingDiscount(ticket.Price * LoadBitcoinExchange()).ToString(),
                    });
                }
            }

            return quickBookings;
        }
        #endregion
        #region 6 - Method for load active bookings
        public async Task<List<IQuickBooking>> LoadMyBookings(string username, string type)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                throw new Exception("Server not found user.");
            }

            var allBookings = _context.Bookings;
            List<Booking> myBookings = new List<Booking>();
            foreach (var book in allBookings)
            {
                if (book.UserID.Equals(user.Id) && book.BookingStatus.Equals("ACCEPTED"))
                {
                    myBookings.Add(book);
                }
            }

            List<IQuickBooking> result = new List<IQuickBooking>();

            foreach (var myBook in myBookings) 
            {
                var currentTicket = _context.Tickets.Find(int.Parse(myBook.TicketID));
                var currentFlight = _context.Flights.Find(myBook.FlightID);
                bool indicator3Hours;

                if (type.Equals("active"))
                {
                    indicator3Hours = CaluclateHoursBetweenDates(currentFlight.Start_time, DateTime.Now) >= 3;
                    if (currentTicket.Is_ticket_purchased && indicator3Hours)
                    {
                        result.Add(new QuickBookingDataModel()
                        {
                            TicketID = currentTicket.Id.ToString(),
                            FlightID = currentFlight.Id.ToString(),
                            StartLocation = currentFlight.Start_location,
                            EndLocation = currentFlight.End_location,
                            StartTime = currentFlight.Start_time.ToString(),
                            EndTime = currentFlight.End_time.ToString(),
                            TicketNumber = currentTicket.Number_of_seat.ToString(),
                            OriginalPrice = currentTicket.Price.ToString(),
                            DiscountPrice = CaluclateQuickBookingDiscount(currentTicket.Price).ToString(),
                            OriginalBitcoinPrice = (currentTicket.Price * LoadBitcoinExchange()).ToString(),
                            DiscountBitcoinPrice = CaluclateQuickBookingDiscount(currentTicket.Price *
                                LoadBitcoinExchange()).ToString(),
                        });
                    }
                }
                else
                {
                    indicator3Hours = CaluclateHoursBetweenDates(currentFlight.Start_time, DateTime.Now) < 3;
                    if (currentTicket.Is_ticket_purchased && indicator3Hours)
                    {
                        result.Add(new QuickBookingDataModel()
                        {
                            TicketID = currentTicket.Id.ToString(),
                            FlightID = currentFlight.Id.ToString(),
                            StartLocation = currentFlight.Start_location,
                            EndLocation = currentFlight.End_location,
                            StartTime = currentFlight.Start_time.ToString(),
                            EndTime = currentFlight.End_time.ToString(),
                            TicketNumber = currentTicket.Number_of_seat.ToString(),
                            OriginalPrice = currentTicket.Price.ToString(),
                            DiscountPrice = CaluclateQuickBookingDiscount(currentTicket.Price).ToString(),
                            OriginalBitcoinPrice = (currentTicket.Price * LoadBitcoinExchange()).ToString(),
                            DiscountBitcoinPrice = CaluclateQuickBookingDiscount(currentTicket.Price *
                                LoadBitcoinExchange()).ToString(),
                        });
                    }
                }
            }

            return result;
        }
        #endregion
        #region 7 - Method for cancel booking
        public async Task<bool> CancelBooking(ICancelBooking cancelBooking)
        {
            var booking = _context.Bookings.Find(cancelBooking.TicketID);
            if (booking == null) 
            {
                throw new ArgumentException("Booking with entered ID doesn't exsist.");
            }
            var userID = booking.UserID;
            var balance = _context.Balances.Find(userID);
            if (balance == null)
            {
                throw new ArgumentException("Balance doesn't exsist.");
            }
            var ticket = _context.Tickets.Find(int.Parse(cancelBooking.TicketID));
            if (ticket == null)
            {
                throw new ArgumentException("Ticket with entered ID doesn't exsist.");
            }
            var myUser = await _userManager.FindByIdAsync(userID);
            if (myUser == null)
            {
                throw new ArgumentException("User doesn't exsist.");
            }

            //ticket update
            ticket.Is_ticket_purchased = false;
            ticket.Time_of_ticket_purchase = new DateTime();
            _context.Tickets.Update(ticket);

            //balance update
            balance.Bitcoins += double.Parse(cancelBooking.BitcoinPrice);
            balance.Dollars += double.Parse(cancelBooking.DollarPrice);
            _context.Balances.Update(balance);

            // booking delete
            _context.Bookings.Remove(booking);

            // user points update
            myUser.Points -= 70;
            await _userManager.UpdateAsync(myUser);

            return true;
        }
        #endregion
        #region 8 - Method for rating booking
        public async Task<bool> RatingBooking(string flightID, string rate)
        {
            var flights = _context.Flights.Include(a => a.Airline);
            Flight flight = new Flight();
            foreach (var fly in flights) 
            {
                if (fly.Id == int.Parse(flightID)) 
                {
                    flight = fly;
                    break;
                }
            }

            var airline = _context.Airlines.Find(flight.Airline.Id);
            if (airline == null) 
            {
                throw new Exception("Airline doesn't exsist.");
            }

            flight.Sum_of_all_grades += double.Parse(rate);
            flight.Number_of_grades += 1;
            airline.Sum_of_all_grades += double.Parse(rate);
            airline.Number_of_grades += 1;

            _context.Flights.Update(flight);
            _context.Airlines.Update(airline);
            await _context.SaveChangesAsync();
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
        #region  Method for sending E-mail
        public async Task SendEmailAsync(string username, string friendsUsername, string mailID, string flightID, string ticketID, Guid transactionID)
        {
            var flight = _context.Flights.Find(int.Parse(flightID));
            var ticket = _context.Tickets.Find(int.Parse(ticketID));

            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress(_mailSettings.Mail, _mailSettings.DisplayName);
            message.To.Add(new MailAddress(mailID));
            message.Subject = "Confirm booking";
            message.Priority = MailPriority.Normal;

            message.IsBodyHtml = false;

            message.Body = "Hello " + friendsUsername + "! Your friend " + username + "make a new booking request.\n" +
                "Booking flight:" +
                "\n\tFlight start location: " + flight.Start_location +
                "\n\tFlight end location: " + flight.End_location +
                "\n\tFlight start time: " + flight.Start_time +
                "\n\tFlight end time: " + flight.End_time +
                "\n\tSeat (ticket) number: " + ticket.Number_of_seat +
                "\n\tSeat (ticket) price: " + ticket.Price * LoadBitcoinExchange() + " ₿" + 
                "\n\n\nIf you have to accept this booking reservation, please click on this link: " +
                "http://localhost:3000/confirmBookingYes/" + friendsUsername + "/" + flightID + "/" + ticketID + "/" + transactionID.ToString() + 
                "\n\n\nIf you have to refuse booking reservation, please click on this link: " +
                "http://localhost:3000/confirmBookingNo/" + ticketID + "\n\n\nThank you for using FlightsForMiles application.";
        
            smtp.Port = _mailSettings.Port;
            smtp.Host = _mailSettings.Host;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            await smtp.SendMailAsync(message);
        }
        #endregion
        #region Method for calucating discount
        public double CaluclateQuickBookingDiscount(double value)
        {
            var discount = _context.Discounts.Find("discID");
            return value - (discount.Is_quick_reservation * value / 100);
        }
        #endregion
        #region Method for loading current bitcoin exchange rates
        private double LoadBitcoinExchange()
        {
            var uri = String.Format("https://blockchain.info/tobtc?currency=USD&value=1");
            WebClient client = new WebClient
            {
                UseDefaultCredentials = true
            };
            var data = client.DownloadString(uri);
            return Convert.ToDouble(data);
        }
        #endregion
        #region Method for caluclate hours between dates
        private double CaluclateHoursBetweenDates(DateTime ticketStartDate, DateTime thisMoment) 
        {
            TimeSpan span = ticketStartDate.Subtract(thisMoment);
            return span.Hours;
        }
        #endregion
    }
}
