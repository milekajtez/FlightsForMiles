using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IAirline
    {
        public int Id { get; }
        public string Name { get; }
        public string HouseNumber { get; }
        public string Street { get; }
        public string City { get; }
        public string Description { get; }
        public string Pricelist { get; }
        public double NumberOfGrades { get; }
        public int NumberOfSoldTickets { get; }
        public double SumOfAllGrades { get; }
    }
}
