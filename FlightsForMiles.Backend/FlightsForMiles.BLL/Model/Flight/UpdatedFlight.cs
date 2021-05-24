using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Flight
{
    public class UpdatedFlight : IFlight
    {
        public UpdatedFlight(int flightID, string startTime, string endTime, string startLocation, string endLocation, string flightLengthTime,
            string flightLengthKM, double sumOfAllGrades, double numberOfGrades, string additionalInfo, string numberOfTransfers,
            string allTransfers, string planeName, string lugageWeight, string airlineID)
        {
            FlightID = flightID;
            StartTime = startTime;
            EndTime = endTime;
            StartLocation = startLocation;
            EndLocation = endLocation;
            FlightTime = flightLengthTime;
            FlightLengthKM = flightLengthKM;
            SumOfAllGrades = sumOfAllGrades;
            NumberOfGrades = numberOfGrades;
            AdditionalInformation = additionalInfo;
            NumberOfTransfers = numberOfTransfers;
            AllTransfers = allTransfers;
            PlaneName = planeName;
            LugageWeight = lugageWeight;
            AirlineID = airlineID;
        }

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
