using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.booking
{
    public class QuickBookingDataModel : IQuickBooking
    {
        public string TicketID { get; set; }
        public string FlightID { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string TicketNumber { get; set; }
        public string OriginalPrice { get; set; }
        public string DiscountPrice { get; set; }
        public string OriginalBitcoinPrice { get; set; }
        public string DiscountBitcoinPrice { get; set; }
    }
}
