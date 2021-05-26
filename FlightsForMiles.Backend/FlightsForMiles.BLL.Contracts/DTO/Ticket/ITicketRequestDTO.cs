using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Ticket
{
    public interface ITicketRequestDTO
    {
        public string Number { get; set; }
        public string Type { get; set; }
        public string Price { get; set; }
        public string IsQuickBooking { get; set; }
        public string FlightID { get; set; }
    }
}
