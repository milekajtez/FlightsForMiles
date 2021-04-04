using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface ILoginUser
    {
        public string Username { get; }
        public string Password { get; }
    }
}
