using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Blockchain
{
    public class UserAmount : IUserAmount
    {
        public string Username { get; }
        public string Type { get; }
        public string Amount { get; }

        public UserAmount(string username, string type, string amount)
        {
            Validation(username, type, amount);

            Username = username;
            Type = type;
            Amount = amount;
        }

        #region Validation
        private void Validation(string username, string type, string amount) 
        {
            if (string.IsNullOrWhiteSpace(username)) 
            {
                throw new ArgumentException(nameof(username));
            }

            if (string.IsNullOrWhiteSpace(type) || (!type.Equals("add") && !type.Equals("new")))
            {
                throw new ArgumentException(nameof(type));
            }

            if  (double.TryParse(amount, out double _)) 
            {
                if (double.Parse(amount) < 0)
                {
                    throw new ArgumentException(nameof(amount));
                }
            }
        }
        #endregion
    }
}
