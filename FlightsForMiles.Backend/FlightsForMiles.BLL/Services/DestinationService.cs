using FlightsForMiles.BLL.Contracts.DTO.Destination;
using FlightsForMiles.BLL.Contracts.Services.Destination;
using FlightsForMiles.BLL.Model.Destination;
using FlightsForMiles.BLL.ResponseDTO.Destination;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class DestinationService : IDestinationService
    {
        private readonly IDestinationRepository _destinationRepository;
        public DestinationService(IDestinationRepository destinationRepository)
        {
            _destinationRepository = destinationRepository;
        }

        #region 1 - Method for add destination
        public long AddDestination(IDestinationRequestDTO destinationRequestDTO)
        {
            if (destinationRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(destinationRequestDTO));
            }

            IDestination destination = ConvertRequestObjectToDestination(destinationRequestDTO);
            return _destinationRepository.AddDestination(destination).Result;
        }
        #endregion
        #region 2 - Method for load one destination
        public IDestinationResponseDTO LoadDestination(int id)
        {
            return ConvertDestinationeObjectToDestinationResponse(_destinationRepository.LoadDestination(id).Result);
        }
        #endregion
        #region 3 - Method for load all destinations
        public List<IDestinationResponseDTO> LoadAllDestinations()
        {
            List<IDestination> destinations = _destinationRepository.LoadAllDestinations();
            List<IDestinationResponseDTO> result = new List<IDestinationResponseDTO>();

            foreach (var dest in destinations)
            {
                result.Add(ConvertDestinationeObjectToDestinationResponse(dest));
            }

            return result;
        }
        #endregion
        #region 4 - Method for delete destination
        public bool DeleteDestination(string destinationID)
        {
            DeleteDestinationValidation(destinationID);
            return _destinationRepository.DeleteDestination(destinationID).Result;
        }
        #endregion
        #region 5 - Method for update destination
        public void UpdateDestination(string destinationID, IDestinationRequestDTO destinationRequestDTO)
        {
            _destinationRepository.UpdateDestination(destinationID, ConvertRequestObjectToUpdatedDestination(destinationID, destinationRequestDTO));
        }
        #endregion

        #region Converting methods
        private IDestination ConvertRequestObjectToDestination(IDestinationRequestDTO destinationRequestDTO)
        {
            return new Destination(0, destinationRequestDTO.AirportName, destinationRequestDTO.City, destinationRequestDTO.Country, destinationRequestDTO.AirlineID);
        }

        private IDestinationResponseDTO ConvertDestinationeObjectToDestinationResponse(IDestination destination)
        {
            return new DestinationResponseDTO()
            {
                AirportID = destination.AirportID.ToString(),
                AirportName = destination.AirportName,
                City = destination.City,
                Country = destination.Country,
                AirlineID = destination.AirlineID
            };
        }

        private IDestination ConvertRequestObjectToUpdatedDestination(string destinationID, IDestinationRequestDTO destinationRequestDTO)
        {
            return new UpdatedDestination(int.Parse(destinationID), destinationRequestDTO.AirportName, destinationRequestDTO.City, destinationRequestDTO.Country, destinationRequestDTO.AirlineID);
        }
        #endregion
        #region Validation method
        private void DeleteDestinationValidation(string destinationID) 
        {
            if (string.IsNullOrEmpty(destinationID) || !int.TryParse(destinationID, out _)) 
            {
                throw new ArgumentException(nameof(destinationID));
            }
        }
        #endregion
    }
}
