using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IUser
    {
        public string Username { get; }
        public string Email { get; }
        public string Password { get; }
        public string Firstname { get; }
        public string Lastname { get; }
        public string Pin { get; }
        public string Address { get; }
        public string Telephone { get; }
        public string Passport { get; }
        public double Points { get; }
    }
}
