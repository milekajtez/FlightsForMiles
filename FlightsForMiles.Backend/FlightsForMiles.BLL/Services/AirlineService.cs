using FlightsForMiles.BLL.Contracts.DTO.Airline;
using FlightsForMiles.BLL.Contracts.Services.Airline;
using FlightsForMiles.BLL.Model.Airline;
using FlightsForMiles.BLL.ResponseDTO.Airline;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class AirlineService : IAirlineService
    {
        private readonly IAirlineRepository _airlineRepository;
        public AirlineService(IAirlineRepository airlineRepository) 
        {
            _airlineRepository = airlineRepository;
        }

        #region 1 - Add airline
        public long AddAirline(IAirlineRequestDTO airlineRequestDTO)
        {
            if (airlineRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(airlineRequestDTO));
            }

            IAirline airline = ConvertRequestObjectToAirline(airlineRequestDTO);
            return _airlineRepository.AddAirline(airline).Result;
        }
        #endregion
        #region 2 - Load airline
        public IAirlineResponseDTO LoadAirline(int id)
        {
            return ConvertAirlineObjectToAirlineResponse(_airlineRepository.LoadAirline(id).Result);
        }
        #endregion

        #region Converting methods
        private IAirline ConvertRequestObjectToAirline(IAirlineRequestDTO airlineRequestDTO) 
        {
            return new Airline(0, airlineRequestDTO.Name, airlineRequestDTO.HouseNumber, airlineRequestDTO.Street, airlineRequestDTO.City,
                airlineRequestDTO.Description, airlineRequestDTO.Pricelist, 0, 0, 0);
        }

        private IAirlineResponseDTO ConvertAirlineObjectToAirlineResponse(IAirline airline) 
        {
            return new AirlineResponseDTO()
            {
                Id = airline.Id.ToString(),
                Name = airline.Name,
                HouseNumber = airline.HouseNumber,
                Street = airline.Street,
                City = airline.City,
                Description = airline.Description,
                Pricelist = airline.Pricelist,
                NumberOfGrades = airline.NumberOfGrades.ToString(),
                NumberOfSoldTickets = airline.NumberOfSoldTickets.ToString(),
                SumOfAllGrades = airline.SumOfAllGrades.ToString()
            };
        }
        #endregion
    }
}
