using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Booking
{
    public interface IBookingWithoutFriendsRequestDTO
    {
        public string Username { get; set; }
        public string FlightID { get; set; }
        public string TicketID { get; set; }
    }
}
