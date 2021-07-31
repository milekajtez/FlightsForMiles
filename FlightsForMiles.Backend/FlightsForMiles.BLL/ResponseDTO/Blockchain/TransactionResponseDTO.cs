using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Blockchain
{
    public class TransactionResponseDTO : ITransactionResponseDTO
    {
        public string TransactionID { get; set; }
        public string Amount { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Signature { get; set; }
        public string Fees { get; set; }
    }
}
