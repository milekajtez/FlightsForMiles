using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IFriendship
    {
        public string Sender { get; }
        public string Reciever { get; }
        public string RequestAccepted { get; }
    }
}
