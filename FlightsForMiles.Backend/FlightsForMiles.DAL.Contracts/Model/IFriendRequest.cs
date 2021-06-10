using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IFriendRequest
    {
        public string Username { get; }
        public string Firstname { get; }
        public string Lastname { get; }
    }
}
