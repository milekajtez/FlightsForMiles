using FlightsForMiles.BLL.Contracts.DTO.Destination;
using FlightsForMiles.BLL.Contracts.Services.Destination;
using FlightsForMiles.RequestDTO.Destination;
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
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationService _destinationService;
        public DestinationsController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        #region 1 - Method for add new destination
        [HttpPost]
        public IActionResult AddDestination(DestinationRequestDTO newDestination) 
        {
            long newDestinationID = _destinationService.AddDestination(newDestination);
            return CreatedAtRoute("GetDestination", new { id = newDestinationID }, newDestination);
        }
        #endregion
        #region 2 - Method for load one destination
        [HttpGet("{id}", Name = "GetDestination")]
        public ActionResult GetAirline(int id)
        {
            IDestinationResponseDTO destination = _destinationService.LoadDestination(id);
            if (destination != null)
            {
                return Ok(destination);
            }

            return NotFound("Destination not found");
        }
        #endregion
        #region 3 - Method for load all destinations
        [HttpGet]
        public IActionResult LoadAllDestinations()
        {
            List<IDestinationResponseDTO> destinations = _destinationService.LoadAllDestinations();
            if (destinations != null)
            {
                return Ok(destinations);
            }

            return NotFound("Server not found any destination.");
        }
        #endregion
        #region 4 - Method for delete destination
        [HttpDelete]
        [Route("{destinationID}")]
        public IActionResult DeleteDestination(string destinationID) 
        {
            bool isDeleted = _destinationService.DeleteDestination(destinationID);
            if (isDeleted) 
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Destination with sended id doesn't exsist.");
        }
        #endregion
        #region 5 - Method for update destination
        [HttpPut]
        [Route("{destinationID}")]
        public IActionResult UpdateDestination(string destinationID, DestinationRequestDTO destinationRequestDTO) 
        {
            _destinationService.UpdateDestination(destinationID, destinationRequestDTO);
            return NoContent();
        }
        #endregion
        #region 6 - Method for load airline's destinations
        [HttpGet]
        [Route("LoadDestinationsForAirline/{airlineID}")]
        public IActionResult LoadDestinationsForAirline(string airlineID) 
        {
            List<IDestinationResponseDTO> destinations = _destinationService.LoadDestinationsForAirline(airlineID);
            if (destinations != null)
            {
                return Ok(destinations);
            }

            return NotFound("Server not found any destination for this airline.");
        }
        #endregion
    }
}
