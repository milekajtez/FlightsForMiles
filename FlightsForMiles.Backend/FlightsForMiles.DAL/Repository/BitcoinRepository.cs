using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.blockchain;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
            foreach (var block in blockchain) 
            {
                if (block.Id.Equals("1")) 
                {
                    throw new Exception("Creating block chain unsuccessfully. We've already had defined blcokchain.");
                }

                break;
            }

            var deafultBlock = new Block()
            {
                Id = "1",
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
            var blockchain = _context.Blocks;
            foreach (var block in blockchain)
            {
                if (block.Id.Equals("1"))
                {
                    blockchainExsist = true;
                    break;
                }
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
