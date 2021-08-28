using FlightsForMiles.BLL.Contracts.DTO.Booking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Booking
{
    public class BookingCancelRequestDTO : IBookingCancelRequestDTO
    {
        public string TicketID { get; set; }
        public string BitcoinPrice { get; set; }
        public string DollarPrice { get; set; }
    }
}
