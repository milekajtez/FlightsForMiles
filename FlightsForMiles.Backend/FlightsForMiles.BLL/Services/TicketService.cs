using FlightsForMiles.BLL.Contracts.DTO.Ticket;
using FlightsForMiles.BLL.Contracts.Services.Ticket;
using FlightsForMiles.BLL.Model.Ticket;
using FlightsForMiles.BLL.ResponseDTO.Ticket;
using FlightsForMiles.DAL.Contracts.Model;
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

        #region 1 - Method for add ticket
        public long AddTicket(ITicketRequestDTO ticketRequestDTO)
        {
            if (ticketRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(ticketRequestDTO));
            }

            ITicket ticket = ConvertTicketRequestObjectToTicket(ticketRequestDTO);
            return _ticketRepository.AddTicket(ticket).Result;
        }
        #endregion
        #region 2 - Method for load one ticket
        public ITicketResponseDTO LoadTicket(long id)
        {
            return ConvertTicketObjectToResponse(_ticketRepository.LoadOneTicket(id));
        }
        #endregion
        #region 3 - Method for load tickets for one flight
        public List<ITicketResponseDTO> LoadTickets(int flightID)
        {
            List<ITicketResponseDTO> result = new List<ITicketResponseDTO>();
            List<ITicket> tickets = _ticketRepository.LoadTickets(flightID);

            foreach (var ticket in tickets) 
            {
                result.Add(ConvertTicketObjectToResponse(ticket));
            }

            return result;
        }
        #endregion

        #region Converting methods
        private ITicket ConvertTicketRequestObjectToTicket(ITicketRequestDTO ticketRequestDTO) 
        {
            return new Ticket(0, "", ticketRequestDTO.Number, ticketRequestDTO.Type, ticketRequestDTO.Price, 
                "", "", ticketRequestDTO.IsQuickBooking, ticketRequestDTO.FlightID, "", "");
        }

        private ITicketResponseDTO ConvertTicketObjectToResponse(ITicket ticket) 
        {
            return new TicketResponseDTO() 
            {
                TicketID = ticket.TicketID.ToString(),
                Airline = ticket.Airline,
                Number = ticket.Number,
                FlightID = ticket.FlightID,
                IsPurchased = ticket.IsPurchased,
                IsQuickBooking = ticket.IsQuickBooking,
                Price = ticket.Price,
                Type = ticket.Type,
                TimePurchased = ticket.TimePurchased,
                StartLocation = ticket.StartLocation,
                EndLocation = ticket.EndLocation
            };
        }
        #endregion
    }
}
