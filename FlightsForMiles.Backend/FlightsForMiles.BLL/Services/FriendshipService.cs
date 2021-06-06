using FlightsForMiles.BLL.Contracts.DTO.Friendship;
using FlightsForMiles.BLL.Contracts.Services.Friendship;
using FlightsForMiles.BLL.Model.Friendship;
using FlightsForMiles.BLL.ResponseDTO.Friendship;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class FriendshipService : IFriendshipService
    {
        private readonly IFriendshipRepository _friendshipRepository;
        public FriendshipService(IFriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        #region 1 - Method for send new friendship request
        public Tuple<long, long> SendFriendshipRequest(IFriendshipRequestDTO friendshipRequestDTO)
        {
            if (friendshipRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(friendshipRequestDTO));
            }

            IFriendship friendship = ConvertRequestObjectToFriendship(friendshipRequestDTO);
            return _friendshipRepository.AddFriendship(friendship).Result;
        }
        #endregion
        #region 2 - Method for get one friendship
        public IFriendshipResponseDTO LoadFriendship(long idSender, long idReceiver)
        {
            return ConvertFriendshipObjectToFriendshipResponse(_friendshipRepository.LoadFrinedship(idSender, idReceiver));
        }
        #endregion

        #region Converting methods
        private IFriendship ConvertRequestObjectToFriendship(IFriendshipRequestDTO friendshipRequestDTO)
        {
            return new Friendship(friendshipRequestDTO.SenderUsername, friendshipRequestDTO.ReceiverUsername, "false");
        }

        private IFriendshipResponseDTO ConvertFriendshipObjectToFriendshipResponse(IFriendship friendship)
        {
            return new FriendshipResponseDTO()
            {
                SenderPin = friendship.Sender,
                RecieverPin = friendship.Reciever,
                RequestAccepted = friendship.RequestAccepted
            };
        }
        #endregion
    }
}
