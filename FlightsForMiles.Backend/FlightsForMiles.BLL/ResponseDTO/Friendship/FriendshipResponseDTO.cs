using FlightsForMiles.BLL.Contracts.DTO.Friendship;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Friendship
{
    public class FriendshipResponseDTO : IFriendshipResponseDTO
    {
        public string SenderPin { get; set; }
        public string RecieverPin { get; set; }
        public string RequestAccepted { get; set; }
    }
}
