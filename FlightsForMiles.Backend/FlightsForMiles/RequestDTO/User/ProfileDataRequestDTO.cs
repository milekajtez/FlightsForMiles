using FlightsForMiles.BLL.Contracts.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.User
{
    public class ProfileDataRequestDTO : IProfileDataRequestDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string Passport { get; set; }
    }
}
