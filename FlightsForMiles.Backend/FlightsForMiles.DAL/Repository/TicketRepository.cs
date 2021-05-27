using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.ticket;
using FlightsForMiles.DAL.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDbContext _context;
        public TicketRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        #region 1 - Method for add new tickets
        public async Task<long> AddTicket(ITicket ticket)
        {
            var resultFind = await _context.Tickets.FindAsync(ticket.TicketID);
            if (resultFind == null) 
            {
                var tickets = _context.Tickets.Include(f => f.Flight);
                foreach (var tic in tickets) 
                {
                    if (tic.Flight.Id.Equals(ticket.FlightID) && tic.Number_of_seat.Equals(ticket.Number)) 
                    {
                        throw new Exception("Add ticket unsuccessfully. This flight already has ticket with entered number.");
                    }
                }

                var flight = await _context.Flights.FindAsync(int.Parse(ticket.FlightID));
                if (flight == null) 
                {
                    throw new Exception("Add ticket unsuccessfully. Flight dosn't exsist.");

                }

                Ticket newTicket = new Ticket()
                {
                    Number_of_seat = int.Parse(ticket.Number),
                    Ticket_type = ticket.Type == "BUSINESS" ? TicketType.BUSINESS_CLASS : ticket.Type == "FIRST" ? TicketType.FIRST_CLASS :
                        TicketType.ECONOMIC_CLASS,
                    Price = double.Parse(ticket.Price),
                    Is_ticket_purchased = false,
                    Time_of_ticket_purchase = DateTime.Now,
                    Is_quick_booking = ticket.IsQuickBooking == "YES",
                    Flight = flight,
                };

                await _context.AddAsync(newTicket);
                await _context.SaveChangesAsync();

                return newTicket.Id;
            }

            throw new Exception("Add ticket unsuccessfully. Base already has this ticket.");
        }
        #endregion
        #region 2 - Method for load one ticket
        public ITicket LoadOneTicket(long id)
        {
            var tickets = _context.Tickets.Include(f => f.Flight.Airline);
            Ticket currentTicket = null;
            foreach (var tic in tickets) 
            {
                if (tic.Id.Equals((int)id)) 
                {
                    currentTicket = tic;
                    break;
                }
            }

            if (currentTicket != null)
            {
                ITicket ticket = new TicketDataModel()
                {
                    TicketID = currentTicket.Id,
                    Number = currentTicket.Number_of_seat.ToString(),
                    Type = currentTicket.Ticket_type == TicketType.BUSINESS_CLASS ? "BUSINESS" :
                        currentTicket.Ticket_type == TicketType.FIRST_CLASS ? "FIRST" : "ECONOMIC",
                    Price = currentTicket.Price.ToString(),
                    TimePurchased = currentTicket.Time_of_ticket_purchase.ToString(),
                    IsPurchased = currentTicket.Is_ticket_purchased == true ? "YES" : "NO",
                    IsQuickBooking = currentTicket.Is_quick_booking == true ? "YES" : "NO",
                    FlightID = currentTicket.Flight.Id.ToString(),
                    Airline = currentTicket.Flight.Airline.Id + " " + currentTicket.Flight.Airline.Name,
                    StartLocation = currentTicket.Flight.Start_location,
                    EndLocation = currentTicket.Flight.End_location
                };

                return ticket;
            }

            throw new NotImplementedException("Flight with this id (" + id + ") doesn't exsist.");
        }
        #endregion
        #region 3 - Method for load ticket for defined flight
        public List<ITicket> LoadTickets(int flightID)
        {
            List<ITicket> result = new List<ITicket>();
            var tickets = _context.Tickets.Include(f => f.Flight.Airline);
            if (tickets != null)
            {
                foreach (var currentTicket in tickets)
                {
                    if (currentTicket.Flight.Id.Equals(flightID))
                    {
                        result.Add(new TicketDataModel()
                        {
                            TicketID = currentTicket.Id,
                            Number = currentTicket.Number_of_seat.ToString(),
                            Type = currentTicket.Ticket_type == TicketType.BUSINESS_CLASS ? "BUSINESS" :
                                currentTicket.Ticket_type == TicketType.FIRST_CLASS ? "FIRST" : "ECONOMIC",
                            Price = currentTicket.Price.ToString(),
                            TimePurchased = currentTicket.Time_of_ticket_purchase.ToString(),
                            IsPurchased = currentTicket.Is_ticket_purchased == true ? "YES" : "NO",
                            IsQuickBooking = currentTicket.Is_quick_booking == true ? "YES" : "NO",
                            FlightID = currentTicket.Flight.Id.ToString(),
                            Airline = currentTicket.Flight.Airline.Id + " (" + currentTicket.Flight.Airline.Name + ")",
                            StartLocation = currentTicket.Flight.Start_location,
                            EndLocation = currentTicket.Flight.End_location
                        });
                    }
                }

                return result;
            }

            throw new Exception("Server not found any ticket.");
        }
        #endregion
        #region 4 - Method for delete ticket
        public async Task<bool> DeleteTicket(string ticketID)
        {
            var resultFind = await _context.Tickets.FindAsync(int.Parse(ticketID));
            if (resultFind != null)
            {
                _context.Tickets.Remove(resultFind);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region 5 - Method for delete all ticket for selected flight
        public async Task<bool> DeleteAllTickets(string flightID)
        {
            var flight = await _context.Flights.FindAsync(int.Parse(flightID));
            if (flight != null) 
            {
                var allTickets = _context.Tickets.Include(f => f.Flight);
                if (allTickets != null) 
                {
                    List<Ticket> tickets = new List<Ticket>();

                    foreach (var ticket in allTickets) 
                    {
                        if (ticket.Flight.Id.Equals(int.Parse(flightID))) 
                        {
                            tickets.Add(ticket);
                        }
                    }

                    if (tickets.Count != 0)
                    {
                        for (int i = 0; i < tickets.Count; i++) 
                        {
                            _context.Tickets.Remove(tickets[i]);
                            _context.SaveChanges();
                        }

                        return true;
                    }
                    else 
                    {
                        return false;
                    }
                }

                return false;
            }

            return false;
        }
        #endregion
    }
}
