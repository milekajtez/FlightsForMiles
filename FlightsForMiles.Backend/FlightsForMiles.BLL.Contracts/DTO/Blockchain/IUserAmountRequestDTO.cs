using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Blockchain
{
    public interface IUserAmountRequestDTO
    {
        public string Username { get; set; }
        public string Type { get; set; }
        public string Amount { get; set; }
    }
}
