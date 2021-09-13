using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.dashboard
{
    public class DashboardDataModel : IDashboardData
    {
        public string TicketID { get; set; }
        public string BitcoinTicketvalue { get; set; }
        public string DollarTicketvalue { get; set; }
        public string PurchasedTime { get; set; }
    }
}