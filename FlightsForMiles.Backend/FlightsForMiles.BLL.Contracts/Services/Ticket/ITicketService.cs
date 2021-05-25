﻿using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Ticket
{
    public interface ITicketService
    {
        long AddTicket(ITicketRequestDTO ticketRequestDTO);
        ITicketResponseDTO LoadTicket(long id);
    }
}
