using FlightsForMiles.BLL.Contracts.DTO.Flight;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Flight
{
    public class FlightResponseDTO : IFlightResponseDTO
    {
        public string FlightID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public string FlightTime { get; set; }
        public string FlightLengthKM { get; set; }
        public string SumOfAllGrades { get; set; }
        public string NumberOfGrades { get; set; }
        public string AdditionalInformation { get; set; }
        public string NumberOfTransfers { get; set; }
        public string AllTransfers { get; set; }
        public string PlaneName { get; set; }
        public string LugageWeight { get; set; }
        public string AirlineID { get; set; }
    }
}
