using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IAirlineRepository
    {
        Task<long> AddAirline(IAirline newAirline);
        Task<IAirline> LoadAirline(int id);
        List<IAirline> LoadAllAirlines();
    }
}
