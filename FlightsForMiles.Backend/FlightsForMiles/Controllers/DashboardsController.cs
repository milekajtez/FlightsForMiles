using FlightsForMiles.BLL.Contracts.DTO.Dashboard;
using FlightsForMiles.BLL.Contracts.Services.Dashboard;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardsController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        public DashboardsController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        #region 1 - Method for loading bitcoin-dollar exchange
        [HttpGet]
        [Route("LoadBitcoinDollarExchange")]
        public IActionResult LoadBitcoinDollarExchange() 
        {
            string result = _dashboardService.LoadBitcoinDollarExchange();
            return Ok(result);
        }
        #endregion
        #region 2 - Method for load tickets for entered airline
        [HttpGet]
        [Route("LoadTicketsForEnteredAirline/{airlineID}")]
        public IActionResult LoadTicketsForEnteredAirline(string airlineID) 
        {
            List<IDashboardDataResponseDTO> dashboardDatas = _dashboardService.LoadTicketsForEnteredAirline(airlineID);
            if (dashboardDatas != null)
            {
                return Ok(dashboardDatas);
            }

            return NotFound("Server not found any data fro dashboard.");
        }
        #endregion
    }
}
