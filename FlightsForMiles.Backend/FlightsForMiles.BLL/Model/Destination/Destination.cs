using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Destination
{
    public class Destination : IDestination
    {
        public Destination(int airportID, string airportName, string city, string country, string airlineID) 
        {
            Validation(airportID, airportName, city, country, airlineID);

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

        #region Validation
        private void Validation(int airportID, string airportName, string city, string country, string airlineID) 
        {
            if (airportID != 0)
            {
                throw new ArgumentException(nameof(airportID));
            }

            if (string.IsNullOrWhiteSpace(airportName))
            {
                throw new ArgumentException(nameof(airportName));
            }

            if (string.IsNullOrWhiteSpace(city))
            {
                throw new ArgumentException(nameof(city));
            }

            if (string.IsNullOrWhiteSpace(country))
            {
                throw new ArgumentException(nameof(country));
            }

            if (string.IsNullOrWhiteSpace(airlineID))
            {
                throw new ArgumentException(nameof(airlineID));
            }
        }
        #endregion
    }
}
