using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Booking
{
    public interface IBookingForFriendsRequestDTO
    {
        public string Username { get; set; }
        public List<string> Friends { get; set; }
        public List<string> Tickets { get; set; }
        public string FlightID { get; set; }
    }
}
