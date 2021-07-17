using FlightsForMiles.BLL.Contracts.DTO.Booking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Booking
{
    public class BookingWithoutFriendsRequestDTO : IBookingWithoutFriendsRequestDTO
    {
        public string Username { get; set; }
        public string FlightID { get; set; }
        public string TicketID { get; set; }
    }
}
