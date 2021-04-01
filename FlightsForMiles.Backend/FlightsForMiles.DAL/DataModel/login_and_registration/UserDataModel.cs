using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.login_and_registration
{
    public class UserDataModel : IUser
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Pin { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string Passport { get; set; }
        public double Points { get; set; }
    }
}
