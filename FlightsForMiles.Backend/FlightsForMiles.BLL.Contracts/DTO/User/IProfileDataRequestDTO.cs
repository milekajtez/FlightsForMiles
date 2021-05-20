using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.User
{
    public interface IProfileDataRequestDTO
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
