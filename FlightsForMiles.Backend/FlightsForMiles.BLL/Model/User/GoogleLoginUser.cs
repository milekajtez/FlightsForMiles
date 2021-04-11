using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.User
{
    public class GoogleLoginUser : IGoogleLoginUser
    {
        public GoogleLoginUser(string idToken) 
        {
            Validation(idToken);

            IdToken = idToken;
        }

        public string IdToken { get; }

        private void Validation(string idToken) 
        {
            if (string.IsNullOrWhiteSpace(idToken))
            {
                throw new ArgumentException(idToken);
            }
        }
    }
}
