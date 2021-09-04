using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Blockchain
{
    public interface ITransactionRequestDTO
    {
        public string Username { get; set; }
        public string FlightID { get; set; }
        public string TicketID { get; set; }
        public string TransactionID { get; set; }
    }
}
