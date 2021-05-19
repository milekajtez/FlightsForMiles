using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IDestinationRepository
    {
        Task<long> AddDestination(IDestination newDestination);
        Task<IDestination> LoadDestination(int id);
        List<IDestination> LoadAllDestinations();
        Task<bool> DeleteDestination(string destinationID);
        void UpdateDestination(string destinationID, IDestination destination);
    }
}
