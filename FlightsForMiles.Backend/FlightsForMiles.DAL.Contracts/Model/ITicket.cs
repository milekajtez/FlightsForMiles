using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface ITicket
    {
        public int TicketID { get; }
        public string Airline { get; }
        public string Number { get; }
        public string Type { get; }
        public string Price { get; }
        public string TimePurchased { get; }
        public string IsPurchased { get; }
        public string IsQuickBooking { get; }
        public string FlightID { get; }
    }
}
