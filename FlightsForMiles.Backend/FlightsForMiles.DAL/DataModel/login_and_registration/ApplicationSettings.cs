using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.login_and_registration
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
    }
}
