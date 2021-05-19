using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Destination
{
    public interface IDestinationRequestDTO
    {
        public string AirportName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string AirlineID { get; set; }
    }
}
