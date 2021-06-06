using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Friendship
{
    public class Friendship : IFriendship
    {
        public Friendship(string sender, string receiver, string requestAccepted) 
        {
            Validation(sender, receiver, requestAccepted);

            Sender = sender;
            Reciever = receiver;
            RequestAccepted = requestAccepted;
        }

        public string Sender { get; }
        public string Reciever { get; }
        public string RequestAccepted { get; }

        #region Validation
        private void Validation(string sender, string receiver, string requestAccepted) 
        {
            if (string.IsNullOrWhiteSpace(sender)) 
            {
                throw new ArgumentException(nameof(sender));
            }

            if (string.IsNullOrWhiteSpace(receiver))
            {
                throw new ArgumentException(nameof(receiver));
            }

            if (string.IsNullOrWhiteSpace(requestAccepted) || !requestAccepted.Equals("false"))
            {
                throw new ArgumentException(nameof(requestAccepted));
            }
        }
        #endregion
    }
}
