using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IFlight
    {
        public int FlightID { get; }
        public string StartTime { get; }
        public string EndTime { get; }
        public string StartLocation { get; }
        public string EndLocation { get; }
        public string FlightTime { get; }
        public string FlightLengthKM { get; }
        public double SumOfAllGrades { get; }
        public double NumberOfGrades { get; }
        public string AdditionalInformation { get; }
        public string NumberOfTransfers { get; }
        public string AllTransfers { get; }
        public string PlaneName { get; }
        public string LugageWeight { get; }
        public string AirlineID { get; }
    }
}
