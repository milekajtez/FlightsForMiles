using FlightsForMiles.RequestDTO.User;
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
    public class ApplicationUsersController : ControllerBase
    {
        [HttpPost]
        public IActionResult UserRegistration(UserRequestDTO newUser)
        {
            //Guid newUserID = _clientService.AddClient(newClient);
            //return CreatedAtRoute("GetClient", new { id = newClientID }, newClientID);
            return Ok();    // samo privremeno

        }
    }
}
