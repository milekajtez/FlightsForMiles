using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.blockchain;
using FlightsForMiles.DAL.DataModel.login_and_registration;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class BitcoinRepository : IBitcoinRepository
    {
        private readonly UserManager<RegisteredUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly MailSettings _mailSettings;
        private readonly string SUCCESS = "SUCCESS";
        private readonly string NO_BOOKING = "NO_BOOKING";
        private readonly string TRANSACTION_VALIDATION_FAILED = "TRANSACTION_VALIDATION_FAILED";
        private readonly string NO_TICKET = "NO_TICKET";
        private readonly string NO_MONEY = "NO_MONEY";

        public BitcoinRepository(UserManager<RegisteredUser> userManager, ApplicationDbContext context,
            IOptions<MailSettings> mailSettings)
        {
            _userManager = userManager;
            _context = context;
            _mailSettings = mailSettings.Value;
        }

        #region 1 - Method for creating default block (blockchain)
        public async Task<bool> CreateDefaultBlock(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (!user.UserName.Equals("mainAdmin")) 
            {
                throw new ArgumentException("This is not system admin. Only system admin can to work with configuration of blockchain.");
            }

            var blockchain = _context.Blocks;
            int counter = 0;
            foreach (var block in blockchain) 
            {
                counter++;
                break;
            }

            if (counter != 0)
            {
                throw new Exception("Creating block chain unsuccessfully. We've already had defined blcokchain.");
            }

            var deafultBlock = new Block()
            {
                Id = Guid.NewGuid(),
                Index = 1,
                Timestamp = DateTime.Now,
                Proof = 0,
                PreviousHash = "",
                Hash = "0000000000000000000000000000000000000000000000000000000000000000",
                Transactions = new List<Transaction>()
            };

            _context.Blocks.Add(deafultBlock);
            _context.SaveChanges();
            return true;
        }
        #endregion
        #region 2 - Method for delete blockchain
        public async Task<bool> DeleteBlockchain(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (!user.UserName.Equals("mainAdmin"))
            {
                throw new ArgumentException("This is not system admin. Only system admin can to work with configuration of blockchain.");
            }

            bool blockchainExsist = false;
            int counter = 0;
            var blockchain = _context.Blocks.Include(t => t.Transactions);
            foreach (var block in blockchain)
            {
                counter++;
                break;
            }

            if (counter != 0)
            {
                blockchainExsist = true;
            }

            if (blockchainExsist) 
            {
                _context.Blocks.RemoveRange(_context.Blocks);
                _context.SaveChanges();
                return blockchainExsist;
            }

            return blockchainExsist;
        }
        #endregion
        #region 3 - Method for load blockchain
        public async Task<List<IBlock>> LoadBlockchain(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (!user.UserName.Equals("mainAdmin"))
            {
                throw new ArgumentException("This is not system admin. Only system admin can to work with configuration of blockchain.");
            }

            var blockchain = _context.Blocks;
            List<IBlock> blocks = new List<IBlock>();
            foreach (var block in blockchain) 
            {
                blocks.Add(new BlockDataModel() 
                {
                    Index = block.Index.ToString(),
                    TimeStamp = block.Timestamp.ToString(),
                    Proof = block.Proof.ToString(),
                    PreviousHash = block.PreviousHash,
                    Hash = block.Hash
                });
            }

            if (blocks.Count == 0) 
            {
                throw new Exception("Load unsuccessfully. Currently blockchain doesn't exsist in system.");
            }

            return blocks;
        }
        #endregion
        #region 4 - Method for define user current amount
        public async Task<bool> AddUserAmount(IUserAmount userAmount)
        {
            var user = await _userManager.FindByNameAsync(userAmount.Username);
            if (user == null) 
            {
                throw new Exception("User not found.");
            }

            var usersBalance = _context.Balances;
            Balance balanceFound = null;
            foreach (var bal in usersBalance) 
            {
                if (bal.UserID.Equals(user.Id)) 
                {
                    if (userAmount.Type.Equals("add"))
                    {
                        balanceFound = bal;
                        balanceFound.Dollars += double.Parse(userAmount.Amount);
                        break;
                    }
                    else 
                    {
                        balanceFound = bal;
                        balanceFound.Dollars = double.Parse(userAmount.Amount);
                        break;
                    }
                }
            }

            if (balanceFound == null) 
            {
                throw new Exception("User's balance not found.");
            }

            _context.Balances.Update(balanceFound);
            await _context.SaveChangesAsync();
            await LoadBitcoinExchangeRates();

            return true;
        }
        #endregion
        #region 5 - Method for load validations which haven't validate jet
        public async Task<List<ITransaction>> LoadTransactionsForValidation(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) 
            {
                throw new ArgumentException("Server not found system admin.");
            }

            if (!user.UserName.Equals("mainAdmin")) 
            {
                throw new ArgumentException("Only system admin can to load transactions.");
            }

            var transactions = _context.Transactions;
            List<ITransaction> currentTransactions = new List<ITransaction>();
            foreach (var trans in transactions) 
            {
                if (!trans.IsValid) 
                {
                    currentTransactions.Add(new TransactionDataModel() 
                    {
                        TransactionID = trans.Id.ToString(),
                        Amount = trans.Amount.ToString(),
                        Sender = trans.SenderPublicKey,
                        Receiver = trans.RecipientPublicKey,
                        Fees = trans.Fees.ToString(),
                        Signature = trans.Signature
                    });
                }
            }

            return currentTransactions;
        }
        #endregion
        #region 6 - Method for transaction minig and validation
        public async Task<bool> MiningTransaction(ITransaction transaction, string username)
        {
            #region Provera da li je to main admin i da li postoji blockchain
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) 
            {
                throw new ArgumentException("Server not found user.");
            }
            if (!user.UserName.Equals("mainAdmin")) 
            {
                throw new ArgumentException("Only system admin can to minig transaction.");
            }
            var blocks = _context.Blocks.Include(t => t.Transactions);
            if (blocks == null)
            {
                throw new Exception("Adding transaction unsuccessfully. Blockchain doesn't exsist.");
            }
            #endregion
            #region Izvlacanje ID-a tiketa za koji hocemo potvrdu
            var senderBooking = await _userManager.FindByNameAsync(transaction.Sender);
            var bookings = _context.Bookings;
            string ticketID = "";
            foreach (var b in bookings) 
            {
                if (b.TransactionID == Guid.Parse(transaction.TransactionID)) 
                {
                    ticketID = b.TicketID;
                }
            }
            #endregion
            #region Provera da li postoji booking u bazi za taj tiket
            var booking = _context.Bookings.Find(ticketID);
            if (booking == null)
            {
                // ukoliko nema booking-a to znaci da treba da se izbrise i transakcija i da se vrati 
                // da je transakcija nevalidna
                DeleteTransaction(transaction);
                await SendEmailAsync(senderBooking.UserName, senderBooking.Email, NO_BOOKING);
                throw new Exception("Mining transaction unsuccessfully. Reason: " + NO_BOOKING);
            }
            #endregion
            #region Validiranje transakcije
            if (!TransactionValidation(transaction, booking.TicketID))
            {
                //ukoliko transakcija nije dobra tj  nevalidna..u metodi je vec izbrisana transakcija
                // ja sad jos treba da izbrisem booking
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
                await SendEmailAsync(senderBooking.UserName, senderBooking.Email, TRANSACTION_VALIDATION_FAILED);
                throw new Exception("Mining transaction unsuccessfully. Reason: " + TRANSACTION_VALIDATION_FAILED);
            }
            #endregion
            #region Provera jel postoji tiket i da li postoji dovoljno novca..ako je sve ok..menja se status tiketa i userbalance-a
            var ticket = _context.Tickets.Find(int.Parse(ticketID));
            if (ticket == null) 
            {
                // ne postoji tiket....brisem transakciju i booking
                DeleteTransaction(transaction);
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
                await SendEmailAsync(senderBooking.UserName, senderBooking.Email, NO_TICKET);
                throw new Exception("Mining transaction unsuccessfully. Reason: " + NO_TICKET);
            }

            if (!ChangeUserBalance(senderBooking.Id, ticket.Price))
            {
                // ukoliko nema dovoljno para isto otpada transakcija i booking
                DeleteTransaction(transaction);
                _context.Bookings.Remove(booking);
                _context.SaveChanges();
                await SendEmailAsync(senderBooking.UserName, senderBooking.Email, NO_MONEY);
                throw new Exception("Mining transaction unsuccessfully. Reason: " + NO_MONEY);
            }

            //ako je sve ok sa tiketom i ako ima dovoljno para menja se status karte
            ChangeTicketStatus(ticket);
            #endregion
            #region Na kraju se radi i izmena u samom booking-u tj booking je accepted a cena je u bitcoin-ima
            booking.Price = ticket.Price / LoadBitcoinExchange().Result;
            booking.BookingStatus = "ACCEPTED";
            _context.Bookings.Update(booking);
            _context.SaveChanges();
            #endregion

            //kad se sve odradi transakcija se doda u blok i posalje se korisniku mejl da je njegov booking prihvacen
            AddTransactionToBlock(blocks, transaction);
            await SendEmailAsync(senderBooking.UserName, senderBooking.Email, SUCCESS);
            return true;
        }
        #endregion
        #region  7 - Method for delete transaction
        public void DeleteTransaction(ITransaction transaction)
        {
            var transactions = _context.Transactions;
            Transaction currentTransaction = null;
            foreach (var trans in transactions)
            {
                if (trans.Id.Equals(Guid.Parse(transaction.TransactionID)))
                {
                    currentTransaction = trans;
                    break;
                }
            }

            _context.Transactions.Remove(currentTransaction);
            _context.SaveChanges();
        }
        #endregion
        #region 8 - Method for sending E-mail
        public async Task SendEmailAsync(string username, string mailID, string messageType)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress(_mailSettings.Mail, _mailSettings.DisplayName);
            message.To.Add(new MailAddress(mailID));
            message.Subject = "Confirm booking";
            message.Priority = MailPriority.Normal;

            message.IsBodyHtml = false;
            if (messageType.Equals(SUCCESS))
            {
                message.Body = "Hello " + username + "! Your request for booking is confirmed. Enjoy in flight!";
            }
            else if (messageType.Equals(NO_BOOKING))
            {
                message.Body = "Hello " + username + "! Your request for booking is invalid. You don't have amount.";
            }
            else if (messageType.Equals(TRANSACTION_VALIDATION_FAILED))
            {
                message.Body = "Hello " + username + "! Your request for booking is invalid. Please, send again request or booking.";
            }
            else if (messageType.Equals(NO_TICKET))
            {
                message.Body = "Hello " + username + "! Your request for booking is invalid. Ticket you entered doesn't exsist. Please, send again request or booking.";
            }
            else if (messageType.Equals(NO_MONEY))
            {
                message.Body = "Hello " + username + "! Your request for booking is invalid. You don't have enough money. Please, send again request or booking.";
            }
            else
            {
                throw new Exception("Send mail unsuccessfuly. Unknown message type.");
            }

            smtp.Port = _mailSettings.Port;
            smtp.Host = _mailSettings.Host;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            await smtp.SendMailAsync(message);
        }
        #endregion
        #region 9 - Method for change ticket status (reservation ticket)
        private void ChangeTicketStatus(Ticket ticket)
        {
            ticket.Is_ticket_purchased = true;
            ticket.Time_of_ticket_purchase = DateTime.Now;
            _context.Tickets.Update(ticket);
            _context.SaveChanges();
        }
        #endregion
        #region 10 - Method for change user amount balance
        private bool ChangeUserBalance(string userID, double ticketDollarPrice)
        {
            var balance = _context.Balances.Find(userID);
            if (balance == null)
            {
                throw new Exception("Server not found user balance amount.");
            }

            double ticketBitcoinPrice = ticketDollarPrice / LoadBitcoinExchange().Result;

            if (balance.Dollars < ticketDollarPrice || balance.Bitcoins < ticketBitcoinPrice)
            {
                return false;
            }

            balance.Dollars -= ticketDollarPrice;
            balance.Bitcoins -= ticketBitcoinPrice;
            _context.Balances.Update(balance);
            _context.SaveChanges();
            return true;
        }
        #endregion
        #region 11 - Method for validation transaction
        private bool TransactionValidation(ITransaction transaction, string ticketID)
        {
            var transactions = _context.Transactions;
            Transaction currentTransaction = null;
            foreach (var trans in transactions)
            {
                if (trans.Id.Equals(Guid.Parse(transaction.TransactionID)))
                {
                    currentTransaction = trans;
                    break;
                }
            }

            if (currentTransaction == null) 
            {
                return false;
            }

            //load keys
            Tuple<RsaKeyParameters, RsaKeyParameters> keys = GetKeys(transaction.Sender);
            string newSignature = GenerateSignature(transaction.Sender, transaction.Receiver,
                double.Parse(transaction.Amount), ticketID, keys);

            if (currentTransaction.Signature.Equals(newSignature))
            {
                currentTransaction.IsValid = true;
                _context.Transactions.Update(currentTransaction);
                _context.SaveChanges();
                return true;
            }

            _context.Transactions.Remove(currentTransaction);
            _context.SaveChanges();
            return false;
        }
        #endregion
        #region 12 - Method for add transaction to block
        private void AddTransactionToBlock(IIncludableQueryable<Block, ICollection<Transaction>> blocks, 
            ITransaction transaction)
        {
            Block previousBlock = null;
            Block currentBlock = null;

            Transaction currentTransaction = null;
            var transactions = _context.Transactions;
            foreach (var trans in transactions) 
            {
                if (trans.Id == Guid.Parse(transaction.TransactionID)) 
                {
                    currentTransaction = trans;
                    break;
                }
            }

            foreach (var block in blocks) 
            {
                if (block.Transactions.Count < 5)
                {
                    currentBlock = block;
                    if (previousBlock == null)
                    {
                        previousBlock = currentBlock;
                    }
                    break;
                }

                currentBlock = block;
                previousBlock = block;
            }

            if (currentBlock.Index == previousBlock.Index && currentBlock.Transactions.Count == 5)
            {
                var newBlock = new Block()
                {
                    Id = Guid.NewGuid(),
                    Index = currentBlock.Index + 1,
                    Timestamp = DateTime.Now,
                    Proof = 0,
                    PreviousHash = currentBlock.Hash,
                    Transactions = new List<Transaction>(),
                    Hash = GetHash(previousBlock),
                };

                newBlock.Transactions.Add(currentTransaction);
                _context.Blocks.Add(newBlock);
                _context.SaveChanges();
            }
            else 
            {
                currentBlock.Transactions.Add(currentTransaction);
                _context.Blocks.Update(currentBlock);
                _context.SaveChanges();
            }
        }
        #endregion

        #region Method for loading current bitcoin exchange rates and change balance
        private async Task<bool> LoadBitcoinExchangeRates() 
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

                var balances = _context.Balances;
                foreach (var bal in balances) 
                {
                    bal.Bitcoins = bal.Dollars / double.Parse(currentBitcoinValue);
                    _context.Update(bal);
                }

                await _context.SaveChangesAsync();
                return true;
            }
            else 
            {
                throw new Exception("Loading exchange unsuccessfully.");
            }
        }
        #endregion
        #region Method for loading current bitcoin exchange rates
        private async Task<double> LoadBitcoinExchange()
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
        #region Method for generate signature
        private string GenerateSignature(string sender, string receiver, double amount, string ticketID, Tuple<RsaKeyParameters, RsaKeyParameters> keys)
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
        #region Method for load key pair from file 
        private string LoadKeyPair(string fileName)
        {
            using StreamReader sr = new StreamReader(fileName);
            return sr.ReadToEnd();
        }
        #endregion
        #region Methods for generate hash for block
        private string GetHash(Block block)
        {
            block.Transactions = new List<Transaction>();
            string blockText = JsonConvert.SerializeObject(block);
            return GetSha256(blockText);
        }

        private string GetSha256(string data)
        {
            var sha256 = new SHA256Managed();
            var hashBuilder = new StringBuilder();

            byte[] bytes = Encoding.Unicode.GetBytes(data);
            byte[] hash = sha256.ComputeHash(bytes);

            foreach (byte x in hash)
            {
                hashBuilder.Append($"{x:x2}");
            }

            return hashBuilder.ToString();
        }
        #endregion
    }
}
