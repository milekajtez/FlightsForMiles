using FlightsForMiles.BLL.Contracts.DTO.Help;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Help
{
    public class AppDescriptionResponseDTO : IAppDescriptionResponseDTO
    {
        public string Description { get; set; }
    }
}
