using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.login_and_registration
{
    public class MailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
