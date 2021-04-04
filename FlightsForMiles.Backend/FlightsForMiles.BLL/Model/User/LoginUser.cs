using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.User
{
    public class LoginUser : ILoginUser
    {
        public LoginUser(string username, string password) 
        {
            Validation(username, password);

            Username = username;
            Password = password;
        }

        public string Username { get; }
        public string Password { get; }

        #region Fields validation
        private void Validation(string username, string password) 
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(username);
            }

            if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
            {
                throw new ArgumentException(password);
            }
        }
        #endregion
    }
}
