using FlightsForMiles.BLL.Contracts.DTO.Booking;
using FlightsForMiles.BLL.Contracts.Services.Booking;
using FlightsForMiles.RequestDTO.Booking;
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
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        #region 1 - Method for booking without friends
        [HttpPost]
        [Route("BookingWithoutFriends")]
        public IActionResult BookingWithoutFriends(BookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO) 
        {
            return Ok();
        }
        #endregion
    }
}
