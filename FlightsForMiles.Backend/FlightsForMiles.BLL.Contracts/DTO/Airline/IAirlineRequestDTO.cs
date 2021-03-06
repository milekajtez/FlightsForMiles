using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Airline
{
    public interface IAirlineRequestDTO
    {
        public string Name { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string Pricelist { get; set; }
    }
}
