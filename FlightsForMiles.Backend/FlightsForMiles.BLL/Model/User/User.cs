using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.User
{
    public class User : IUser
    {
        public User(string username, string email, string password, string firstname, string lastname, string pin, string address,
            string telephone, string passport, double points) 
        {
            Validation(username, email, password, firstname, lastname, pin, address, telephone, points);

            Username = username;
            Email = email;
            Password = password;
            Firstname = firstname;
            Lastname = lastname;
            Pin = pin;
            Address = address;
            Telephone = telephone;
            Passport = passport;
            Points = points;
        }

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

        #region Validation fields method
        private void Validation(string username, string email, string password, string firstname, string lastname, string pin, 
            string address, string telephone, double points) 
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
            if (string.IsNullOrWhiteSpace(firstname))
            {
                throw new ArgumentException(firstname);
            }
            if (string.IsNullOrWhiteSpace(lastname))
            {
                throw new ArgumentException(lastname);
            }
            if (string.IsNullOrWhiteSpace(pin))
            {
                throw new ArgumentException(pin);
            }
            if (string.IsNullOrWhiteSpace(address))
            {
                throw new ArgumentException(address);
            }
            if (string.IsNullOrWhiteSpace(telephone))
            {
                throw new ArgumentException(telephone);
            }
            if (points.GetType() != typeof(double) || points != 0) 
            {
                throw new ArgumentException(telephone);
            }
        }
        #endregion
    }
}
