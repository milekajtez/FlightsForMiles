using FlightsForMiles.BLL.Contracts.DTO.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Airline
{
    public class AirlineResponseDTO : IAirlineResponseDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string Description { get; set; }
        public string SumOfAllGrades { get; set; }
        public string NumberOfGrades { get; set; }
        public string Pricelist { get; set; }
        public string NumberOfSoldTickets { get; set; }
    }
}
