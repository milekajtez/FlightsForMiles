using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.User
{
    public class AvioAdmin : IAvioAdmin
    {
        public AvioAdmin(string username, string email, string password, string pin, string telephone) 
        {
            Validation(username, email, password, pin, telephone);

            Username = username;
            Email = email;
            Password = password;
            Pin = pin;
            Telephone = telephone;
        }

        public string Username { get; }
        public string Email { get; }
        public string Password { get; }
        public string Pin { get; }
        public string Telephone { get; }

        #region Validation fields method
        private void Validation(string username, string email, string password, string pin, string telephone)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(username);
            }
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException(email);
            }
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException(password);
            }
            if (string.IsNullOrWhiteSpace(pin))
            {
                throw new ArgumentException(pin);
            }
            if (string.IsNullOrWhiteSpace(telephone))
            {
                throw new ArgumentException(telephone);
            }
        }
        #endregion
    }
}
