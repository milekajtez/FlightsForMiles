using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IDiscount
    {
        public string DiscQuick { get; set; }
        public string Disc300 { get; set; }
        public string Disc600 { get; set; }
        public string Disc1200 { get; set; }
    }
}
