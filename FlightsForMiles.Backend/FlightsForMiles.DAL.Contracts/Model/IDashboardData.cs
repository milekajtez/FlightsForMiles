using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IDashboardData
    {
        public string TicketID { get; }
        public string BitcoinTicketvalue { get; }
        public string DollarTicketvalue { get; }
        public string PurchasedTime { get; }
    }
}
