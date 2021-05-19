using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Destination
{
    public class UpdatedDestination : IDestination
    {
        public UpdatedDestination(int airportID, string airportName, string city, string country, string airlineID)
        {
            AirportID = airportID;
            AirportName = airportName;
            City = city;
            Country = country;
            AirlineID = airlineID;
        }

        public int AirportID { get; }
        public string AirportName { get; }
        public string City { get; }
        public string Country { get; }
        public string AirlineID { get; }
    }
}
