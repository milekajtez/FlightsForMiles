using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IFriendshipRepository
    {
        Task<Tuple<long, long>> AddFriendship(IFriendship friendship);
        IFriendship LoadFrinedship(long idSender, long idReceiver);
    }
}
