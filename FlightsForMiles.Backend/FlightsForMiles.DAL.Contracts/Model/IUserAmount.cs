using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IUserAmount
    {
        public string Username { get; }
        public string Type { get; }
        public string Amount { get; }
    }
}
