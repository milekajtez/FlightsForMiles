using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IQuickBooking
    {
        public string TicketID { get; }
        public string FlightID { get; }
        public string StartLocation { get; }
        public string EndLocation { get; }
        public string StartTime { get; }
        public string EndTime { get; }
        public string TicketNumber { get; }
        public string OriginalPrice { get; }
        public string DiscountPrice { get; }
        public string OriginalBitcoinPrice { get; }
        public string DiscountBitcoinPrice { get; }
    }
}
