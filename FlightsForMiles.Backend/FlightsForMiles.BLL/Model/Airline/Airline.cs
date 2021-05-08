using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Airline
{
    public class Airline : IAirline
    {
        public Airline(int id, string name, string houseNumber, string street, string city, string description, string pricelist,
            double numberOfGrades, int numberOfSoldTickets, double sumOfAllGrades) 
        {
            Validation(id, name, houseNumber, street, city, description, pricelist, numberOfGrades, numberOfSoldTickets, sumOfAllGrades);

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

        #region Validation
        private void Validation(int id, string name, string houseNumber, string street, string city, string description, string pricelist,
            double numberOfGrades, double numberOfSoldTickets, double sumOfAllGrades) 
        {
            if (id != 0)
            {
                throw new ArgumentException(nameof(id));
            }

            if (string.IsNullOrWhiteSpace(name)) 
            {
                throw new ArgumentException(nameof(name));
            }

            if (string.IsNullOrWhiteSpace(houseNumber) || !int.TryParse(houseNumber, out _))
            {
                throw new ArgumentException(nameof(houseNumber));
            }
            else 
            {
                if (int.Parse(houseNumber) <= 0) 
                {
                    throw new ArgumentException(nameof(houseNumber));
                }
            }

            if (string.IsNullOrWhiteSpace(street))
            {
                throw new ArgumentException(nameof(street));
            }

            if (string.IsNullOrWhiteSpace(city))
            {
                throw new ArgumentException(nameof(city));
            }

            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentException(nameof(description));
            }

            if (string.IsNullOrWhiteSpace(pricelist))
            {
                throw new ArgumentException(nameof(pricelist));
            }

            if (numberOfGrades != 0)
            {
                throw new ArgumentException(nameof(numberOfGrades));
            }

            if (numberOfSoldTickets != 0)
            {
                throw new ArgumentException(nameof(numberOfSoldTickets));
            }

            if (sumOfAllGrades != 0)
            {
                throw new ArgumentException(nameof(sumOfAllGrades));
            }

        }
        #endregion
    }
}
