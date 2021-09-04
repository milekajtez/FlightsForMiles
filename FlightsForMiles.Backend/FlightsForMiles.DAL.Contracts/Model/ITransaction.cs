using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface ITransaction
    {
        public string Username { get; }
        public string FlightID { get; }
        public string TicketID { get; }
        public string TransactionID { get; }
    }
}
