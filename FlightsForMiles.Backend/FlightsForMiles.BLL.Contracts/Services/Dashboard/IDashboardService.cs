using FlightsForMiles.BLL.Contracts.DTO.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Dashboard
{
    public interface IDashboardService
    {
        string LoadBitcoinDollarExchange();
        List<IDashboardDataResponseDTO> LoadTicketsForEnteredAirline(string airlineID);
    }
}
