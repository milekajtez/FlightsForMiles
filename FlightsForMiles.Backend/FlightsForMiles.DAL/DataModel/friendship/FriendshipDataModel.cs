using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.friendship
{
    public class FriendshipDataModel : IFriendship
    {
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public string RequestAccepted { get; set; }
    }
}
