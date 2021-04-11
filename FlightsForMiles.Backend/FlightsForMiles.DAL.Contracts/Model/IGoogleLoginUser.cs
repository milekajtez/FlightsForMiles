using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IGoogleLoginUser
    {
        public string IdToken { get; }
    }
}
