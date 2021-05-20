using FlightsForMiles.BLL.Contracts.DTO.Help;
using FlightsForMiles.BLL.Contracts.Services.Help;
using FlightsForMiles.RequestDTO.Help;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpsController : ControllerBase
    {
        private readonly IHelpService _helpService;
        public HelpsController(IHelpService helpService)
        {
            _helpService = helpService;
        }

        #region 1 - Method for load application description
        [HttpGet]
        public IActionResult LoadAppDescription()
        {
            IAppDescriptionResponseDTO result = _helpService.LoadAppDescription();
            return Ok(result);
        }
        #endregion
        #region 2 - Method for update application description
        [HttpPut]
        public IActionResult UpdateAppDescription(AppDescriptionRequestDTO updatedAppDescription) 
        {
            _helpService.UpdateAppDescription(updatedAppDescription);
            return NoContent();
        }
        #endregion
    }
}
