using FlightsForMiles.BLL.Contracts.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.User
{
    public class GoogleLoginUserRequestDTO : IGoogleLoginUserRequestDTO
    {
        public string IdToken { get; set; }
    }
}
