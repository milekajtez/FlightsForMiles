using FlightsForMiles.BLL.Contracts.DTO.Booking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Booking
{
    public class BookingForFriendsRequestDTO : IBookingForFriendsRequestDTO
    {
        public string Username { get; set; }
        public List<string> Friends { get; set; }
        public List<string> Tickets { get; set; }
        public string FlightID { get; set; }
    }
}
