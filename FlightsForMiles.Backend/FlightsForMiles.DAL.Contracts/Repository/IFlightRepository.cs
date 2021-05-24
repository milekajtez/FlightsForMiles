using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IFlightRepository
    {
        Task<long> AddFlight(IFlight newFlight);
        Task<IFlight> LoadFlight(int id);
        List<IFlight> LoadAllFlights();
        Task<bool> DeleteFlight(string flightID);
        void UpdateFlight(string flightID, IFlight flight);
    }
}
