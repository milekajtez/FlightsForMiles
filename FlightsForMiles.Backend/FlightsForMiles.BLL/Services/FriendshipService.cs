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
        #region 3 - Method for load my requests
        public List<IFriendRequestResponseDTO> LoadRequests(string username, string requestType)
        {
            FriendRequestValidation(username, requestType);

            List<IFriendRequest> requests = _friendshipRepository.LoadRequests(username, requestType).Result;
            List<IFriendRequestResponseDTO> result = new List<IFriendRequestResponseDTO>();

            foreach (var req in requests)
            {
                result.Add(ConvertFriendRequesteObjectToFriendRequestResponse(req));
            }

            return result;
        }
        #endregion
        #region 4 - Method for cancel request
        public bool CancelRequest(string username, string secondUsername)
        {
            Validation(username, secondUsername);
            return _friendshipRepository.CancelRequest(username, secondUsername).Result;
        }
        #endregion
        #region 5 - Method for reject request
        public bool RejectRequest(string username, string secondUsername)
        {
            Validation(username, secondUsername);
            return _friendshipRepository.RejectRequest(username, secondUsername).Result;
        }
        #endregion
        #region 6 - Method for accept request
        public void AcceptRequest(string username, string secondUsername)
        {
            Validation(username, secondUsername);
            bool isDeleted = _friendshipRepository.AcceptRequest(username, secondUsername).Result;
            if (!isDeleted) 
            {
                throw new KeyNotFoundException("Accepting unsuccessfully. Request doesn't exsist.");
            }
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

        private IFriendRequestResponseDTO ConvertFriendRequesteObjectToFriendRequestResponse(IFriendRequest friendRequest) 
        {
            return new FriendRequestResponseDTO()
            {
                Username = friendRequest.Username,
                Firstname = friendRequest.Firstname,
                Lastname = friendRequest.Lastname
            };
        }
        #endregion
        #region FriendRequestValidation
        private void FriendRequestValidation(string username, string requestType) 
        {
            if (string.IsNullOrWhiteSpace(username)) 
            {
                throw new ArgumentException(nameof(username));
            }

            if (string.IsNullOrWhiteSpace(requestType) || (!requestType.Equals("fromMe") && !requestType.Equals("toMe"))) 
            {
                throw new ArgumentException(nameof(requestType));
            }
        }

        private void Validation(string username, string secondUsername) 
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(nameof(username));
            }

            if (string.IsNullOrWhiteSpace(secondUsername))
            {
                throw new ArgumentException(nameof(secondUsername));
            }
        }
        #endregion
    }
}
