using FlightsForMiles.BLL.Contracts.DTO.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Dashboard
{
    public class DashboardDataResponseDTO : IDashboardDataResponseDTO
    {
        public string TicketID { get; set; }
        public string BitcoinTicketvalue { get; set; }
        public string DollarTicketvalue { get; set; }
        public string PurchasedTime { get; set; }
    }
}
