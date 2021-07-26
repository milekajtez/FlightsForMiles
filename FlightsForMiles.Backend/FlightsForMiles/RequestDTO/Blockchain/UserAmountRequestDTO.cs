using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Blockchain
{
    public class UserAmountRequestDTO : IUserAmountRequestDTO
    {
        public string Username { get; set; }
        public string Type { get; set; }
        public string Amount { get; set; }
    }
}
