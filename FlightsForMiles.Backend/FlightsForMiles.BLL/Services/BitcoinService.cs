﻿using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using FlightsForMiles.BLL.Contracts.Services.Bitcoin;
using FlightsForMiles.BLL.ResponseDTO.Blockchain;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class BitcoinService : IBitcoinService
    {
        private readonly IBitcoinRepository _bitcoinRepository;
        public BitcoinService(IBitcoinRepository  bitcoinRepository)
        {
            _bitcoinRepository = bitcoinRepository;
        }

        #region 1 - Method for creating default block (blockchain)
        public bool CreateDefaultBlock(string username)
        {
            UsernameValidation(username);
            return _bitcoinRepository.CreateDefaultBlock(username).Result;
        }
        #endregion
        #region 2 - Method for delete blockchain
        public bool DeleteBlockchain(string username)
        {
            UsernameValidation(username);
            return _bitcoinRepository.DeleteBlockchain(username).Result;
        }
        #endregion
        #region 3 - Method for load blockchain
        public List<IBlockResponseDTO> LoadBlockchain(string username)
        {
            UsernameValidation(username);
            List<IBlock> blockchain = _bitcoinRepository.LoadBlockchain(username).Result;
            List<IBlockResponseDTO> result = new List<IBlockResponseDTO>();

            foreach (var block in blockchain)
            {
                result.Add(ConvertBlockObjectToBlockResponse(block));
            }

            return result;
        }
        #endregion

        #region Converting methods
        private IBlockResponseDTO ConvertBlockObjectToBlockResponse(IBlock block)
        {
            return new BlockResponseDTO()
            {
                Index = block.Index,
                TimeStamp = block.TimeStamp,
                Proof = block.Proof,
                PreviousHash = block.PreviousHash,
                Hash = block.Hash
            };
        }
        #endregion
        #region Methods for validations
        private void UsernameValidation(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(nameof(username));
            }
        }
        #endregion
    }
}