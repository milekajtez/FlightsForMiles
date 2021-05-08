using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.airline
{
    public class AirlineDataModel : IAirline
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string Pricelist { get; set; }
        public double NumberOfGrades { get; set; }
        public int NumberOfSoldTickets { get; set; }
        public double SumOfAllGrades { get; set; }
    }
}
