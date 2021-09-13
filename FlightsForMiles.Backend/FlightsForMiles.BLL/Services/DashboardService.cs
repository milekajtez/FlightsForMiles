using FlightsForMiles.BLL.Contracts.DTO.Dashboard;
using FlightsForMiles.BLL.Contracts.Services.Dashboard;
using FlightsForMiles.BLL.ResponseDTO.Dashboard;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;
        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        #region 1 - Method for loading bitcoin-dollar exchange
        public string LoadBitcoinDollarExchange()
        {
            return _dashboardRepository.LoadBitcoinDollarExchange();
        }
        #endregion
        #region 2 - Method for load tickets for entered airline
        public List<IDashboardDataResponseDTO> LoadTicketsForEnteredAirline(string airlineID)
        {
            ValidateAirlineID(airlineID);
            List<IDashboardData> dashboardDatas = _dashboardRepository.LoadTicketsForEnteredAirline(airlineID);
            List<IDashboardDataResponseDTO> result = new List<IDashboardDataResponseDTO>();

            foreach (var dash in dashboardDatas)
            {
                result.Add(ConvertDashboardDataObjectTotDashboardDataResponse(dash));
            }

            return result;
        }
        #endregion

        #region Validation methods
        public void ValidateAirlineID(string airlineID) 
        {
            if (string.IsNullOrWhiteSpace(airlineID))
            {
                throw new ArgumentException(nameof(airlineID));
            }
            else 
            {
                if (!int.TryParse(airlineID, out _))
                {
                    throw new ArgumentException(nameof(airlineID));
                }
                else 
                {
                    if (int.Parse(airlineID) < 1) 
                    {
                        throw new ArgumentException(nameof(airlineID));
                    }
                }
            }
        }
        #endregion
        #region converting methods
        public IDashboardDataResponseDTO ConvertDashboardDataObjectTotDashboardDataResponse(IDashboardData dashboardData) 
        {
            return new DashboardDataResponseDTO() 
            {
                TicketID = dashboardData.TicketID,
                PurchasedTime = dashboardData.PurchasedTime,
                DollarTicketvalue = dashboardData.DollarTicketvalue,
                BitcoinTicketvalue = dashboardData.BitcoinTicketvalue
            };
        }

        #endregion
    }
}
