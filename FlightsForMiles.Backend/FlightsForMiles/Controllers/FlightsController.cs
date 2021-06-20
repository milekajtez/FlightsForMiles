using FlightsForMiles.BLL.Contracts.DTO.Flight;
using FlightsForMiles.BLL.Contracts.Services.Flight;
using FlightsForMiles.RequestDTO.Flight;
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
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;
        public FlightsController(IFlightService flightService) 
        {
            _flightService = flightService;
        }

        #region 1 - Method for add flight
        [HttpPost]
        public IActionResult AddFlight(FlightRequestDTO newFlight) 
        {
            long newFlightID = _flightService.AddFlight(newFlight);
            return CreatedAtRoute("GetFlight", new { id = newFlightID }, newFlight);
        }
        #endregion
        #region 2 - Load one flight
        [HttpGet("{id}", Name = "GetFlight")]
        public ActionResult GetFlight(int id)
        {
            IFlightResponseDTO flight = _flightService.LoadFlight(id);
            if (flight != null)
            {
                return Ok(flight);
            }

            return NotFound("Flight not found");
        }
        #endregion
        #region 3 - Load all flights
        [HttpGet]
        public IActionResult LoadAllFlights()
        {
            List<IFlightResponseDTO> flights = _flightService.LoadAllFlights();
            if (flights != null)
            {
                return Ok(flights);
            }

            return NotFound("Server not found any flight.");
        }
        #endregion
        #region 4 - Delete flight
        [HttpDelete]
        [Route("{flightID}")]
        public IActionResult DeleteFlight(string flightID)
        {
            bool isDeleted = _flightService.DeleteFlight(flightID);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Flight with sended id doesn't exsist.");
        }
        #endregion
        #region 5 - Update flight
        [HttpPut]
        [Route("{flightID}")]
        public IActionResult UpdateDestination(string flightID, FlightRequestDTO flightRequestDTO)
        {
            _flightService.UpdateFlight(flightID, flightRequestDTO);
            return NoContent();
        }
        #endregion
        #region 6 - Method for load airline's flights
        [HttpGet]
        [Route("LoadFlightsForAirline/{airlineID}")]
        public IActionResult LoadFlightsForAirline(string airlineID)
        {
            List<IFlightResponseDTO> flights = _flightService.LoadFlightsForAirline(airlineID);
            if (flights != null)
            {
                return Ok(flights);
            }

            return NotFound("Server not found any flight for this airline.");
        }
        #endregion
    }
}
