using FlightsForMiles.BLL.Contracts.DTO.Friendship;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Friendship
{
    public interface IFriendshipService
    {
        Tuple<long, long> SendFriendshipRequest(IFriendshipRequestDTO friendshipRequestDTO);
        IFriendshipResponseDTO LoadFriendship(long idSender, long idReceiver);
        List<IFriendRequestResponseDTO> LoadRequests(string username, string requestType);
        bool CancelRequest(string username, string secondUsername);
        bool RejectRequest(string username, string secondUsername);
        void AcceptRequest(string username, string secondUsername);
    }
}
