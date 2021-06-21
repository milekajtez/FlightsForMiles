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
        #region 4 - Method for delete ticket
        public bool DeleteTicket(string ticketID)
        {
            DeleteTicketValidation(ticketID);
            return _ticketRepository.DeleteTicket(ticketID).Result;
        }
        #endregion
        #region 5 - Method for delete all tickets for selected flight
        public bool DeleteAllTickets(string flightID)
        {
            DeleteTicketValidation(flightID);
            return _ticketRepository.DeleteAllTickets(flightID).Result;
        }
        #endregion
        #region 6 - Method for update ticket
        public void UpdateTicket(string ticketID, ITicketRequestDTO ticketRequestDTO)
        {
            _ticketRepository.UpdateTicket(ticketID, ConvertTicketRequestObjectToUpdatedTicket(ticketID, ticketRequestDTO));
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

        private ITicket ConvertTicketRequestObjectToUpdatedTicket(string ticketID, ITicketRequestDTO ticketRequestDTO)
        {
            return new UpdatedTicket(int.Parse(ticketID), "", ticketRequestDTO.Number, ticketRequestDTO.Type,
                ticketRequestDTO.Price, "", "", ticketRequestDTO.IsQuickBooking, ticketRequestDTO.FlightID, "", "");
        }
        #endregion
        #region Validation method
        private void DeleteTicketValidation(string ticketID)
        {
            if (string.IsNullOrEmpty(ticketID) || !int.TryParse(ticketID, out _))
            {
                throw new ArgumentException(nameof(ticketID));
            }
        }
        #endregion
    }
}
