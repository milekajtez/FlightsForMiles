using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Friendship
{
    public interface IFriendshipRequestDTO
    {
        public string SenderUsername { get; set; }
        public string ReceiverUsername { get; set; }
    }
}
