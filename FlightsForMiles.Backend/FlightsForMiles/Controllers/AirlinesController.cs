using FlightsForMiles.BLL.Contracts.DTO.Airline;
using FlightsForMiles.BLL.Contracts.Services.Airline;
using FlightsForMiles.RequestDTO.Airline;
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
    public class AirlinesController : ControllerBase
    {
        private readonly IAirlineService _airlineService;
        public AirlinesController(IAirlineService airlineService) 
        {
            _airlineService = airlineService;
        }

        #region 1 - Add new airline
        [HttpPost]
        public IActionResult AddNewAirline(AirlineRequestDTO newAirline) 
        {
            long newAirlineID = _airlineService.AddAirline(newAirline);
            return CreatedAtRoute("GetAirline", new { id = newAirlineID }, newAirline);
        }
        #endregion
        #region 2 - Load one airline
        [HttpGet("{id}", Name = "GetAirline")]
        public ActionResult GetAirline(int id)
        {
            IAirlineResponseDTO airline = _airlineService.LoadAirline(id);
            if (airline != null)
            {
                return Ok(airline);
            }

            return NotFound("Airline not found");
        }
        #endregion
        #region 3 - Method for load all airlines
        [HttpGet]
        public IActionResult LoadAllAirlines() 
        {
            List<IAirlineResponseDTO> airlines = _airlineService.LoadAllAirlines();
            if (airlines != null) 
            {
                return Ok(airlines);
            }

            return NotFound("Server not found any airline.");
        }
        #endregion
    }
}
