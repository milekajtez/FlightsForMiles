using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IBookingWithoutFriends
    {
        public string FlightID { get; }
        public string TicketID { get; }
        public string Username { get; }
    }
}
