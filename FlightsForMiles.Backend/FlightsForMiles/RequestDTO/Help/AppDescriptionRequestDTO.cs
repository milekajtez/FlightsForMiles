using FlightsForMiles.BLL.Contracts.DTO.Help;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Help
{
    public class AppDescriptionRequestDTO : IAppDescriptionRequestDTO
    {
        public string Description { get; set; }
    }
}
