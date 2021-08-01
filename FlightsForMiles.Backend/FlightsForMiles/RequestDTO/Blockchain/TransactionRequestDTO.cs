using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Blockchain
{
    public class TransactionRequestDTO : ITransactionRequestDTO
    {
        public string TransactionID { get; set; }
        public string Amount { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public string Fees { get; set; }
        public string Signature { get; set; }
    }
}
