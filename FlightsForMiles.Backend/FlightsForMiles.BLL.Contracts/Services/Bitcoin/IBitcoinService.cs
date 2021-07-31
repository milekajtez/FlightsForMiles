using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Bitcoin
{
    public interface IBitcoinService
    {
        bool CreateDefaultBlock(string username);
        bool DeleteBlockchain(string username);
        List<IBlockResponseDTO> LoadBlockchain(string username);
        bool AddUserAmount(IUserAmountRequestDTO userAmountRequestDTO);
        List<ITransactionResponseDTO> LoadTransactionsForValidation(string username);
    }
}
