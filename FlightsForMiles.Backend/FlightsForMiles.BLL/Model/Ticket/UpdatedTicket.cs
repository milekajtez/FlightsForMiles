using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Ticket
{
    public class UpdatedTicket : ITicket
    {
        public UpdatedTicket(int ticketID, string airline, string number, string type, string price, string timePurchased,
            string isPurchased, string isQuickBooking, string flightID, string startLocation, string endLocation)
        {
            TicketID = ticketID;
            Airline = airline;
            Number = number;
            Type = type;
            Price = price;
            TimePurchased = timePurchased;
            IsPurchased = isPurchased;
            IsQuickBooking = isQuickBooking;
            FlightID = flightID;
            StartLocation = startLocation;
            EndLocation = endLocation;
        }

        public int TicketID { get; set; }
        public string Airline { get; set; }
        public string Number { get; set; }
        public string Type { get; set; }
        public string Price { get; set; }
        public string TimePurchased { get; set; }
        public string IsPurchased { get; set; }
        public string IsQuickBooking { get; set; }
        public string FlightID { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
    }
}
