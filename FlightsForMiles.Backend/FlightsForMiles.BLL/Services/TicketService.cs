using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using FlightsForMiles.BLL.Contracts.Services.Ticket;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public long AddTicket(ITicketRequestDTO ticketRequestDTO)
        {
            ///continue...
            throw new NotImplementedException();
        }

        public ITicketResponseDTO LoadTicket(long id)
        {
            throw new NotImplementedException();
        }

        // converting methods
    }
}
