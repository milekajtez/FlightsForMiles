using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IBitcoinRepository
    {
        Task<bool> CreateDefaultBlock(string username);
        Task<bool> DeleteBlockchain(string username);
        Task<List<IBlock>> LoadBlockchain(string username);
    }
}
