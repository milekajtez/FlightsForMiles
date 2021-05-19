using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IDestination
    {
        public int AirportID { get; }
        public string AirportName { get; }
        public string City { get; }
        public string Country { get; }
        public string AirlineID { get; }
    }
}
