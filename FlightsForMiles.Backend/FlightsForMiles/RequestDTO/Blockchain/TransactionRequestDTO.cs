using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Blockchain
{
    public class TransactionRequestDTO : ITransactionRequestDTO
    {
        public string Username { get; set; }
        public string FlightID { get; set; }
        public string TicketID { get; set; }
        public string TransactionID { get; set; }

    }
}
