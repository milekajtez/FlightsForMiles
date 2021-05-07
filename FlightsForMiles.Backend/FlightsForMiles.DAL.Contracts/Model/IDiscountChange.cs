using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IDiscountChange
    {
        public string Value { get; set; }
        public string Type { get; set; }
    }
}
