using FlightsForMiles.BLL.Contracts.DTO.Friendship;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO
{
    public class FriendshipRequestDTO : IFriendshipRequestDTO
    {
        public string SenderUsername { get; set; }
        public string ReceiverUsername { get; set; }
    }
}
