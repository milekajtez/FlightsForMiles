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
        Task<List<IFriendRequest>> LoadRequests(string username, string requestType);
        Task<bool> CancelRequest(string username, string secondUsername);
        Task<bool> RejectRequest(string username, string secondUsername);
        Task<bool> AcceptRequest(string username, string secondUsername);
    }
}
