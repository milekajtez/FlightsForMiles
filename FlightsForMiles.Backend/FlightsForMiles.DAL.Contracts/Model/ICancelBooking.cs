using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface ICancelBooking
    {
        public string TicketID { get; }
        public string BitcoinPrice { get; }
        public string DollarPrice { get; }
    }
}
