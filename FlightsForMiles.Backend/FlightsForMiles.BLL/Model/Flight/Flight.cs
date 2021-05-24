using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Flight
{
    public class Flight : IFlight
    {
        public Flight(int flightID, string startTime, string endTime, string startLocation, string endLocation, string flightLengthTime,
            string flightLengthKM, double sumOfAllGrades, double numberOfGrades, string additionalInfo, string numberOfTransfers,
            string allTransfers, string planeName, string lugageWeight, string airlineID)
        {
            Validation(flightID, startTime, endTime, startLocation, endLocation, flightLengthTime, flightLengthKM, sumOfAllGrades,
                numberOfGrades, additionalInfo, numberOfTransfers, allTransfers, planeName, lugageWeight, airlineID);

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

        #region Validation
        private void Validation(int flightID, string startTime, string endTime, string startLocation, string endLocation, string flightTime,
            string flightLengthKM, double sumOfAllGrades, double numberOfGrades, string additionalInfo, string numberOfTransfers,
            string allTransfers, string planeName, string lugageWeight, string airlineID)
        {
            if (!flightID.Equals(0))
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (string.IsNullOrEmpty(startTime) || !DateTime.TryParse(startTime, out DateTime _))
            {
                throw new ArgumentException(nameof(startTime));
            }

            if (string.IsNullOrEmpty(endTime) || !DateTime.TryParse(endTime, out DateTime _))
            {
                throw new ArgumentException(nameof(endTime));
            }

            if (string.IsNullOrEmpty(startLocation))
            {
                throw new ArgumentException(nameof(startLocation));
            }

            if (string.IsNullOrEmpty(endLocation))
            {
                throw new ArgumentException(nameof(endLocation));
            }

            if (string.IsNullOrEmpty(flightTime) || !double.TryParse(flightTime, out double _))
            {
                if (double.Parse(flightTime) <= 0)
                {
                    throw new ArgumentException(nameof(flightTime));
                }
            }

            if (string.IsNullOrEmpty(flightLengthKM) || !double.TryParse(flightLengthKM, out double _))
            {
                if (double.Parse(flightLengthKM) <= 0)
                {
                    throw new ArgumentException(nameof(flightLengthKM));
                }
            }

            if (!sumOfAllGrades.Equals(0))
            {
                throw new ArgumentException(nameof(sumOfAllGrades));
            }

            if (!numberOfGrades.Equals(0))
            {
                throw new ArgumentException(nameof(numberOfGrades));
            }

            if (string.IsNullOrEmpty(additionalInfo))
            {
                throw new ArgumentException(nameof(additionalInfo));
            }

            if (string.IsNullOrEmpty(numberOfTransfers) || !int.TryParse(numberOfTransfers, out int _))
            {
                if (double.Parse(numberOfTransfers) < 0)
                {
                    throw new ArgumentException(nameof(numberOfTransfers));
                }
            }

            if (string.IsNullOrEmpty(allTransfers))
            {
                throw new ArgumentException(nameof(allTransfers));
            }

            if (string.IsNullOrEmpty(planeName))
            { 
                throw new ArgumentException(nameof(planeName));
            }

            if (string.IsNullOrEmpty(lugageWeight) || !double.TryParse(lugageWeight, out double _))
            {
                if (double.Parse(lugageWeight) < 0)
                {
                    throw new ArgumentException(nameof(lugageWeight));
                }
            }

            if (string.IsNullOrEmpty(airlineID) || !int.TryParse(airlineID, out int _))
            {
                throw new ArgumentException(nameof(airlineID));
            }

        }
        #endregion
    }
}
