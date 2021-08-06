using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IBookingForFriends
    {
        public string Username { get; }
        public List<string> Friends { get; }
        public List<string> TicketsID { get; }
        public string FlightID { get; }
    }
}
