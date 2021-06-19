using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Airline
{
    public class UpdatedAirline : IAirline
    {
        public UpdatedAirline(int id, string name, string houseNumber, string street, string city, string description, string pricelist,
            double numberOfGrades, int numberOfSoldTickets, double sumOfAllGrades)
        {
            Id = id;
            Name = name;
            HouseNumber = houseNumber;
            Street = street;
            City = city;
            Description = description;
            Pricelist = pricelist;
            NumberOfGrades = numberOfGrades;
            NumberOfSoldTickets = numberOfSoldTickets;
            SumOfAllGrades = sumOfAllGrades;
        }

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
