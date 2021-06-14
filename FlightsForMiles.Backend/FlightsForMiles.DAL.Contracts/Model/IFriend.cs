using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IFriend
    {
        public string Username { get; }
        public string Pin { get; }
        public string Firstname { get; }
        public string Lastname { get; }
        public string PhoneNumber { get; }
    }
}
