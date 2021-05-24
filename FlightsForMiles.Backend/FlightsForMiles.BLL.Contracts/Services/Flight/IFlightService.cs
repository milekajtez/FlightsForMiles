using FlightsForMiles.BLL.Contracts.DTO.Flight;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Flight
{
    public interface IFlightService
    {
        long AddFlight(IFlightRequestDTO flightRequestDTO);
        IFlightResponseDTO LoadFlight(int id);
        List<IFlightResponseDTO> LoadAllFlights();
        bool DeleteFlight(string flightID);
        void UpdateFlight(string flightID, IFlightRequestDTO flightRequestDTO);
    }
}
