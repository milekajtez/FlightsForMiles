using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Flight
{
    public interface IFlightRequestDTO
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public string FlightTime { get; set; }
        public string FlightLength { get; set; }
        public string NumOfTransfers { get; set; }
        public string AllTransfers { get; set; }
        public string PlaneName { get; set; }
        public string LugageWeight { get; set; }
        public string Airline { get; set; }
        public string AdditionalInfo { get; set; }
    }
}
