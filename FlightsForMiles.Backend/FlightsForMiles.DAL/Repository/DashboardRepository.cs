using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.dashboard;
using FlightsForMiles.DAL.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;
        public DashboardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        #region 1 - Method for loading bitcoin-dollar exchange
        public string LoadBitcoinDollarExchange()
        {
            var uri = String.Format("https://blockchain.info/tobtc?currency=USD&value=1");
            WebClient client = new WebClient
            {
                UseDefaultCredentials = true
            };
            var data = client.DownloadString(uri);
            return  (1.00 / Convert.ToDouble(data)).ToString();
        }
        #endregion
        #region 2 - Method for load tickets for entered airline
        public List<IDashboardData> LoadTicketsForEnteredAirline(string airlineID)
        {
            var allAirlines = _context.Airlines;
            Airline airline = null;
            foreach (var air in allAirlines) 
            {
                if (air.Id.Equals(int.Parse(airlineID))) 
                {
                    airline = air;
                    break;
                }
            }

            if (airline == null) 
            {
                throw new ArgumentException("Server can't to find airline woth entered airline ID");
            }

            var allFlights = _context.Flights.Include(a => a.Airline);
            List<Flight> flights = new List<Flight>();
            foreach (var fly in allFlights) 
            {
                if (fly.Airline.Id.Equals(airline.Id)) 
                {
                    flights.Add(fly);
                }
            }

            if (flights.Count == 0)
            {
                throw new ArgumentException("Current airline don't have any flight.");
            }

            var allTickets = _context.Tickets.Include(f => f.Flight);
            List<Ticket> tickets = new List<Ticket>();
            foreach (var tic in allTickets)
            {
                if (tic.Is_ticket_purchased)
                {
                    tickets.Add(tic);
                }
            }

            if (tickets.Count == 0)
            {
                throw new ArgumentException("Current flight don't have any purchased ticket.");
            }

            List<IDashboardData> result = new List<IDashboardData>();
            foreach (var flight in flights) 
            {
                foreach (var ticket in tickets) 
                {
                    if (flight.Id.Equals(ticket.Flight.Id)) 
                    {
                        result.Add(new DashboardDataModel()
                        {
                            TicketID = ticket.Id.ToString(),
                            PurchasedTime = ticket.Time_of_ticket_purchase.ToString(),
                            DollarTicketvalue = ticket.Price.ToString(),
                            BitcoinTicketvalue = LoadBitcoinValue(ticket.Price).ToString()
                        });
                    }
                }
            }

            if (result.Count == 0)
            {
                throw new ArgumentException("Current airline has not sold any ticket.");
            }

            return result;
        }
        #endregion

        #region Method for calucating bitcoin value for entered dollars
        public double LoadBitcoinValue(double dollars)
        {
            var uri = String.Format("https://blockchain.info/tobtc?currency=USD&value=1");
            WebClient client = new WebClient
            {
                UseDefaultCredentials = true
            };
            var data = client.DownloadString(uri);
            return Convert.ToDouble(data) * dollars;
        }
        #endregion
    }
}
