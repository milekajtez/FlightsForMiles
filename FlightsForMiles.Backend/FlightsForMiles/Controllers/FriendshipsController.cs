using FlightsForMiles.BLL.Contracts.DTO.Friendship;
using FlightsForMiles.BLL.Contracts.Services.Friendship;
using FlightsForMiles.RequestDTO;
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
    public class FriendshipsController : ControllerBase
    {
        private readonly IFriendshipService _friendshipService;
        public FriendshipsController(IFriendshipService friendshipService)
        {
            _friendshipService = friendshipService;
        }

        #region 1 - Method for send friendship request
        [HttpPost]
        public IActionResult SendFriendshipRequest(FriendshipRequestDTO newFriendshipRequest) 
        {
            Tuple<long, long> newFriendshipIDs = _friendshipService.SendFriendshipRequest(newFriendshipRequest);
            FriendshipRequestDTO newObj = new FriendshipRequestDTO()
            {
                SenderUsername = newFriendshipIDs.Item1.ToString(),
                ReceiverUsername = newFriendshipIDs.Item2.ToString()
            };
            return CreatedAtRoute("GetFrinedship", newObj);
        }
        #endregion
        #region 2 - Method for Get one frinedship
        [HttpGet(Name= "GetFrinedship")]
        public ActionResult GetFrinedship(FriendshipRequestDTO newFriendshipRequest)
        {
            IFriendshipResponseDTO friendship = _friendshipService.LoadFriendship(long.Parse(newFriendshipRequest.SenderUsername), 
                long.Parse(newFriendshipRequest.ReceiverUsername));
            if (friendship != null)
            {
                return Ok(friendship);
            }

            return NotFound("Friendship not found");
        }
        #endregion
    }
}
