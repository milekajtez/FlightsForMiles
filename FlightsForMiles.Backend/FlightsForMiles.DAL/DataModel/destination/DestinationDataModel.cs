using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.destination
{
    public class DestinationDataModel : IDestination
    {
        public int AirportID { get; set; }
        public string AirportName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string AirlineID { get; set; }
    }
}
