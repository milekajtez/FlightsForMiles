using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Help
{
    public class AppDescription : IAppDescription
    {
        public AppDescription(string description) 
        {
            Validation(description);

            Description = description;
        }

        public string Description { get; }

        #region Validation
        public void Validation(string description) 
        {
            if (string.IsNullOrEmpty(description)) 
            {
                throw new ArgumentException(nameof(description));
            }
        }
        #endregion
    }
}
