using FlightsForMiles.BLL.Contracts.DTO.Destination;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Destination
{
    public interface IDestinationService
    {
        long AddDestination(IDestinationRequestDTO destinationRequestDTO);
        IDestinationResponseDTO LoadDestination(int id);
        List<IDestinationResponseDTO> LoadAllDestinations();
        bool DeleteDestination(string destinationID);
        void UpdateDestination(string destinationID, IDestinationRequestDTO destinationRequestDTO);
        List<IDestinationResponseDTO> LoadDestinationsForAirline(string airlineID);
    }
}
