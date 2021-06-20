using FlightsForMiles.BLL.Contracts.DTO.Flight;
using FlightsForMiles.BLL.Contracts.Services.Flight;
using FlightsForMiles.BLL.Model.Flight;
using FlightsForMiles.BLL.ResponseDTO.Flight;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class FlightService : IFlightService
    {
        private readonly IFlightRepository _flightRepository;
        public FlightService(IFlightRepository flightRepository) 
        {
            _flightRepository = flightRepository;
        }

        #region 1 - Add new flight
        public long AddFlight(IFlightRequestDTO flightRequestDTO)
        {
            if (flightRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(flightRequestDTO));
            }

            IFlight flight = ConvertRequestObjectToFlight(flightRequestDTO);
            return _flightRepository.AddFlight(flight).Result;
        }
        #endregion
        #region 2 - Load one flight
        public IFlightResponseDTO LoadFlight(int id)
        {
            return ConvertFlightObjectToFlightResponse(_flightRepository.LoadFlight(id).Result);
        }
        #endregion
        #region 3 - Load all flights
        public List<IFlightResponseDTO> LoadAllFlights()
        {
            List<IFlight> flights = _flightRepository.LoadAllFlights();
            List<IFlightResponseDTO> result = new List<IFlightResponseDTO>();

            foreach (var fly in flights)
            {
                result.Add(ConvertFlightObjectToFlightResponse(fly));
            }

            return result;
        }
        #endregion
        #region 4 - Method for delete flight
        public bool DeleteFlight(string flightID)
        {
            DeleteFlightValidation(flightID);
            return _flightRepository.DeleteFlight(flightID).Result;
        }
        #endregion
        #region 5 - Method for update flight
        public void UpdateFlight(string flightID, IFlightRequestDTO flightRequestDTO)
        {
            _flightRepository.UpdateFlight(flightID, ConvertRequestObjectToUpdatedFlight(flightID, flightRequestDTO));
        }
        #endregion
        #region 6 - Method for load airline's flight
        public List<IFlightResponseDTO> LoadFlightsForAirline(string airlineID)
        {
            ValidationAirlineID(airlineID);
            List<IFlight> flights = _flightRepository.LoadFlightsForAirline(airlineID);
            List<IFlightResponseDTO> result = new List<IFlightResponseDTO>();

            foreach (var fly in flights)
            {
                result.Add(ConvertFlightObjectToFlightResponse(fly));
            }

            return result;
        }
        #endregion

        #region Converting methods
        private IFlight ConvertRequestObjectToFlight(IFlightRequestDTO flightRequestDTO)
        {
            return new Flight(0, flightRequestDTO.StartTime, flightRequestDTO.EndTime, flightRequestDTO.StartLocation, flightRequestDTO.EndLocation,
                flightRequestDTO.FlightTime, flightRequestDTO.FlightLength, 0, 0, flightRequestDTO.AdditionalInfo, 
                flightRequestDTO.NumOfTransfers, flightRequestDTO.AllTransfers, flightRequestDTO.PlaneName, flightRequestDTO.LugageWeight,
                flightRequestDTO.Airline);
        }

        private IFlightResponseDTO ConvertFlightObjectToFlightResponse(IFlight flight)
        {
            return new FlightResponseDTO()
            {
                FlightID = flight.FlightID.ToString(),
                StartTime = flight.StartTime,
                EndTime = flight.EndTime,
                StartLocation = flight.StartLocation,
                EndLocation = flight.EndLocation,
                FlightTime = flight.FlightTime,
                FlightLengthKM = flight.FlightLengthKM,
                SumOfAllGrades = flight.SumOfAllGrades.ToString(),
                NumberOfGrades = flight.NumberOfGrades.ToString(),
                AdditionalInformation = flight.AdditionalInformation,
                NumberOfTransfers = flight.NumberOfTransfers,
                AllTransfers = flight.AllTransfers,
                PlaneName = flight.PlaneName,
                LugageWeight = flight.LugageWeight,
                AirlineID = flight.AirlineID
            };
        }

        private IFlight ConvertRequestObjectToUpdatedFlight(string flightID, IFlightRequestDTO flightRequestDTO)
        {
            return new UpdatedFlight(int.Parse(flightID), flightRequestDTO.StartTime, flightRequestDTO.EndTime, flightRequestDTO.StartLocation, flightRequestDTO.EndLocation,
               flightRequestDTO.FlightTime, flightRequestDTO.FlightLength, 0, 0, flightRequestDTO.AdditionalInfo,
               flightRequestDTO.NumOfTransfers, flightRequestDTO.AllTransfers, flightRequestDTO.PlaneName, flightRequestDTO.LugageWeight,
               "");
        }
        #endregion
        #region Validation method
        private void DeleteFlightValidation(string flightID)
        {
            if (string.IsNullOrEmpty(flightID) || !int.TryParse(flightID, out _))
            {
                throw new ArgumentException(nameof(flightID));
            }
        }

        private void ValidationAirlineID(string airlineID)
        {
            if (string.IsNullOrWhiteSpace(airlineID) || !int.TryParse(airlineID, out _))
            {
                throw new ArgumentException(nameof(airlineID));
            }
        }
        #endregion
    }
}
