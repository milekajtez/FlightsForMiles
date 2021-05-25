using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Ticket
{
    public class TicketRequestDTO : ITicketRequestDTO
    {
        public string Number { get; set; }
        public string Type { get; set; }
        public string Price { get; set; }
        public string TimePurchased { get; set; }
        public string IsPurchased { get; set; }
        public string IsQuickBooking { get; set; }
        public string FlightID { get; set; }
    }
}
