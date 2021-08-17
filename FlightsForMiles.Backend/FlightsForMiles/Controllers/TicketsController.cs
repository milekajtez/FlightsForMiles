using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using FlightsForMiles.BLL.Contracts.Services.Ticket;
using FlightsForMiles.RequestDTO.Ticket;
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
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketsController(ITicketService ticketService) 
        {
            _ticketService = ticketService;
        }

        #region 1 - Method for add ticket in flight
        [HttpPost]
        public IActionResult AddTicket(TicketRequestDTO newTicket) 
        {
            long newTicketID = _ticketService.AddTicket(newTicket);
            return CreatedAtRoute("GetTicket", new { id = newTicketID }, newTicket);
        }
        #endregion
        #region 2 - Get (Load one ticket)
        [HttpGet("{id}", Name = "GetTicket")]
        public ActionResult GetTicket(long id)   //GetGetTicket....zato nije pozivalo metode kod destination i ostalim kontrolerima..popraviti to!!!!
        {
            ITicketResponseDTO newTicket = _ticketService.LoadTicket(id);
            if (newTicket != null)
            {
                return Ok(newTicket);
            }

            return NotFound("Server not found a ticket.");
        }
        #endregion
        #region 3 - Method for load tickets for one flight
        [HttpGet("LoadTickets/{flightID}")]
        public IActionResult LoadTickets(int flightID)
        {
            List<ITicketResponseDTO> result = _ticketService.LoadTickets(flightID);
            if (result == null) 
            {
                throw new Exception("Not found any ticket.");
            }

            return Ok(result);
        }
        #endregion
        #region 4 - Method for delete ticket
        [HttpDelete("{ticketID}")]
        public IActionResult DeleteTicket(string ticketID) 
        {
            bool isDeleted = _ticketService.DeleteTicket(ticketID);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Ticket with sended id doesn't exsist or ticket is purchased.");
        }
        #endregion
        #region 5 - Method for delete all ticket for selected flight
        [HttpDelete("DeleteAllTickets/{flightID}")]
        public IActionResult DeleteAllTickets(string flightID) 
        {
            bool isDeleted = _ticketService.DeleteAllTickets(flightID);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Selected flight doesn't have any ticket or it dosn't exsist or ticket is already purchased.");
        }
        #endregion
        #region 6 - Method for update ticket
        [HttpPut("{ticketID}")]
        public IActionResult UpdateTicket(string ticketID, TicketRequestDTO ticketRequestDTO) 
        {
            _ticketService.UpdateTicket(ticketID, ticketRequestDTO);
            return NoContent();
        }
        #endregion
    }
}
