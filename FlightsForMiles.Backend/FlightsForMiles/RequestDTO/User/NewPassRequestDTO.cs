using FlightsForMiles.BLL.Contracts.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.User
{
    public class NewPassRequestDTO : INewPassRequestDTO
    {
        public string Password { get; set; }
    }
}
