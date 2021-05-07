using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.discount
{
    public class DiscountDataModel : IDiscount
    {
        public string DiscQuick { get; set; }
        public string Disc300 { get; set; }
        public string Disc600 { get; set; }
        public string Disc1200 { get; set; }
    }
}
