using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface ITicketRepository
    {
        Task<long> AddTicket(ITicket ticket);
        ITicket LoadOneTicket(long id);
        List<ITicket> LoadTickets(int flightID);
    }
}
