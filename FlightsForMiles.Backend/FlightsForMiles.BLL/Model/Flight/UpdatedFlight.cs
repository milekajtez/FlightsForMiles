using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Flight
{
    public class UpdatedFlight : IFlight
    {
        public int FlightID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public string FlightTime { get; set; }
        public string FlightLengthKM { get; set; }
        public double SumOfAllGrades { get; set; }
        public double NumberOfGrades { get; set; }
        public string AdditionalInformation { get; set; }
        public string NumberOfTransfers { get; set; }
        public string AllTransfers { get; set; }
        public string PlaneName { get; set; }
        public string LugageWeight { get; set; }
        public string AirlineID { get; set; }
    }
}
