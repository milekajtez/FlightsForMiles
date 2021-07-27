using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.blockchain;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class BitcoinRepository : IBitcoinRepository
    {
        private readonly UserManager<RegisteredUser> _userManager;
        private readonly ApplicationDbContext _context;
        public BitcoinRepository(UserManager<RegisteredUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
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
                Hash = "0000000000000000000000000000000000000000000000000000000000000000"
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
            var blockchain = _context.Blocks;
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

        #region Method for loading current bitcoin exchange rates
        private async Task<bool> LoadBitcoinExchangeRates() 
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

                List<Balance> newBalances = new List<Balance>();
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




        #region X - Metode za generisanje hash-a u odnosu na blok
        //na osnovu bloka koji sma prosledio pravi se hash
        private string GetHash(Block block)
        {
            string blockText = JsonConvert.SerializeObject(block);
            return GetSha256(blockText);
        }

        /// <summary>
        /// metoda za generisanje hash-a
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
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
