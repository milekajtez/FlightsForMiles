using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Destination
{
    public interface IDestinationResponseDTO
    {
        public string AirportID { get; set; }
        public string AirportName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string AirlineID { get; set; }
    }
}
