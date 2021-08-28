using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Booking
{
    public interface IBookingCancelRequestDTO
    {
        public string TicketID { get; set; }
        public string BitcoinPrice { get; set; }
        public string DollarPrice { get; set; }
    }
}
