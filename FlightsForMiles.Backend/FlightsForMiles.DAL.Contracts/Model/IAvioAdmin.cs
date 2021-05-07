using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IAvioAdmin
    {
        public string Username { get; }
        public string Email { get; }
        public string Password { get; }
        public string Pin { get; }
        public string Telephone { get; }
    }
}
