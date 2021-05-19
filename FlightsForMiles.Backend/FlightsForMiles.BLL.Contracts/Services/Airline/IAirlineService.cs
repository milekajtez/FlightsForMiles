using FlightsForMiles.BLL.Contracts.DTO.Airline;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Airline
{
    public interface IAirlineService
    {
        long AddAirline(IAirlineRequestDTO airlineRequestDTO);
        IAirlineResponseDTO LoadAirline(int id);
        List<IAirlineResponseDTO> LoadAllAirlines();
    }
}
