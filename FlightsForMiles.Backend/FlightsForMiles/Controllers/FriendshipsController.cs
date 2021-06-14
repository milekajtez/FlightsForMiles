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
        [HttpGet(Name = "GetFrinedship")]
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
        #region 3 - Method for load my requests
        [HttpGet]
        [Route("LoadRequests/{username}/{requestType}")]
        public IActionResult LoadRequests(string username, string requestType)
        {
            List<IFriendRequestResponseDTO> requests = _friendshipService.LoadRequests(username, requestType);
            if (requests != null)
            {
                return Ok(requests);
            }

            return NotFound("Server not found any request.");
        }
        #endregion
        #region 4 - Method for cancel request
        [HttpDelete]
        [Route("CancelRequest/{username}/{secondUsername}")]
        public IActionResult CancelRequest(string username, string secondUsername)
        {
            bool isDeleted = _friendshipService.CancelRequest(username, secondUsername);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Canceling unsuccessfully. Request doesn't exsist.");
        }
        #endregion
        #region 5 - Method for reject request
        [HttpDelete]
        [Route("RejectRequest/{username}/{secondUsername}")]
        public IActionResult RejectRequest(string username, string secondUsername)
        {
            bool isDeleted = _friendshipService.RejectRequest(username, secondUsername);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Rejecting unsuccessfully. Request doesn't exsist.");
        }
        #endregion
        #region 6 - Method for accept request
        [HttpGet]
        [Route("AcceptRequest/{username}/{secondUsername}")]
        public IActionResult AcceptRequest(string username, string secondUsername)
        {
            _friendshipService.AcceptRequest(username, secondUsername);
            return NoContent();
        }
        #endregion
        #region 7 - Method for load friends
        [HttpGet]
        [Route("LoadFriends/{username}")]
        public IActionResult LoadFriends(string username)
        {
            List<IFriendResponseDTO> friends = _friendshipService.LoadFriends(username);
            if (friends != null)
            {
                return Ok(friends);
            }

            return NotFound("You don't have any frineds yet.");
        }
        #endregion
        #region 8 - Method for delete friend
        [HttpDelete]
        [Route("DeleteFriend/{username}/{pin}")]
        public IActionResult DeleteFriend(string username, string pin) 
        {
            bool isDeleted = _friendshipService.DeleteFriend(username, pin);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Friend doesn't exsist.");
        }
        #endregion
    }
}
