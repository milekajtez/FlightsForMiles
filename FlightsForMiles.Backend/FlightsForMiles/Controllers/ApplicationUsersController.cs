using FlightsForMiles.BLL.Contracts.DTO.User;
using FlightsForMiles.BLL.Contracts.Services.User;
using FlightsForMiles.RequestDTO.User;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserService _userService;
        public ApplicationUsersController(IUserService userService) 
        {
            _userService = userService;
        }

        #region 1 - Add (User registration)
        [HttpPost]
        public IActionResult UserRegistration(UserRequestDTO newUser)
        {
            long newUserID = _userService.AddUser(newUser);
            return CreatedAtRoute("GetUser", new { id = newUserID }, newUser);
        }
        #endregion
        #region 2 - Confirm registration
        [HttpPut("{username}")]
        public ActionResult ConfirmRegistration(string username) 
        {
            _userService.ConfirmRegistration(username);
            return NoContent();
        }
        #endregion
        #region 3 - Get (Load one user)
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult GetUser(int id)
        {
            IUserResponseDTO newUser = _userService.LoadUser(id);
            if (newUser != null)
            {
                return Ok(newUser);
            }

            return NotFound("User not found");
        }
        #endregion
        #region 4 - User login
        [HttpPost]
        [Route("UserLogin")]
        public IActionResult UserLogin(LoginUserRequestDTO loginUser) 
        {
            object result = _userService.UserLogin(loginUser);
            return Ok(result);
        }
        #endregion
        #region 5 - User google login
        [AllowAnonymous]
        [HttpPost]
        [Route("UserGoogleLogin")]
        public IActionResult UserGoogleLogin(GoogleLoginUserRequestDTO googleLoginUser)
        {
            object result = _userService.UserGoogleLogin(googleLoginUser);
            return Ok(result);
        }
        #endregion
        #region 6 - Avio admin registration
        [HttpPost]
        [Route("AvioAdminRegistration")]
        public IActionResult AvioAdminRegistration(AvioAdminRequestDTO newAvioAdmin) 
        {
            long newAvioAdminID = _userService.AddAvioAdmin(newAvioAdmin);
            return CreatedAtRoute("GetUser", new { id = newAvioAdminID }, newAvioAdmin);
        }
        #endregion
        #region 7 - Method for changing password for first avio admin login
        [HttpPut]
        [Route("FirstLoginChangePass/{pin}")]
        public ActionResult FirstLoginChangePass(string pin, NewPassRequestDTO newPass) 
        {
            _userService.ChangePass(pin, newPass.Password);
            return NoContent();
        }
        #endregion
        #region 8 - Method for load user profile data
        [HttpGet]
        [Route("LoadUserProfileData/{username}")]
        public IActionResult LoadUserProfileData(string username) 
        {
            IProfileDataResponseDTO profileData = _userService.LoadUserProfileData(username);
            if (profileData != null)
            {
                return Ok(profileData);
            }

            return NotFound("User profile data not found");
        }
        #endregion
    }
}
