using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.User
{
    public interface IGoogleLoginUserRequestDTO
    {
        public string IdToken { get; set; }
    }
}
