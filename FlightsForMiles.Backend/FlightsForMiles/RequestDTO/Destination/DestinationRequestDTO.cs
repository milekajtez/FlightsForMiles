using FlightsForMiles.BLL.Contracts.DTO.Destination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Destination
{
    public class DestinationRequestDTO : IDestinationRequestDTO
    {
        public string AirportName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string AirlineID { get; set; }
    }
}
