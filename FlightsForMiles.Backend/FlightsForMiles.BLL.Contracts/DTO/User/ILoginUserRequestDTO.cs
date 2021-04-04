using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.User
{
    public interface ILoginUserRequestDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
