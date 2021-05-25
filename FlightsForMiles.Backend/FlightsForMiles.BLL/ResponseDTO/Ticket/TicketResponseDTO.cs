using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Ticket
{
    public class TicketResponseDTO : ITicketResponseDTO
    {
        public string Airline { get; set; }
        public string FlightID { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public string Price { get; set; }
        public string TimePurchased { get; set; }
        public string isPurchased { get; set; }
        public string IsQuickBooking { get; set; }
    }
}
