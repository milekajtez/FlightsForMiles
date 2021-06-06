using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Friendship
{
    public interface IFriendshipResponseDTO
    {
        public string SenderPin { get; set; }
        public string RecieverPin { get; set; }
        public string RequestAccepted { get; set; }
    }
}
