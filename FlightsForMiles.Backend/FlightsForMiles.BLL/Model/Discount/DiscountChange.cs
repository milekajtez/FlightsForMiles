using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Discount
{
    public class DiscountChange : IDiscountChange
    {
        public string Value { get; set; }
        public string Type { get; set; }
    }
}
