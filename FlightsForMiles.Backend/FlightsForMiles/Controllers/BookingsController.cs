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
            bool bookingCreated = _bookingService.BookingWithoutFriends(bookingWithoutFriendsRequestDTO);
            if (bookingCreated)
            {
                return Ok();
            }

            throw new Exception("Booking unsuccessfuly.");
        }
        #endregion
        #region 2 - Method for booking for friends
        [HttpPost]
        [Route("BookingForFriends")]
        public IActionResult BookingForFriends(BookingForFriendsRequestDTO bookingForFriendsRequestDTO) 
        {
            bool bookingsCreated = _bookingService.BookingForFriends(bookingForFriendsRequestDTO);
            if (bookingsCreated)
            {
                return Ok();
            }

            throw new Exception("Booking unsuccessfuly.");
        }
        #endregion
        #region 3 - Method for confirm booking
        [HttpPut]
        [Route("ConfirmBookingRequest/{ticketID}")]
        public IActionResult ConfirmBookingRequest(string ticketID) 
        {
            bool isConfirmed = _bookingService.ConfirmBookingRequest(ticketID);
            if (isConfirmed) 
            {
                return Ok();
            }

            throw new Exception("Confirming booking reservation unsuccessfully.");
        }
        #endregion
        #region 4 - Method for refuse booking
        [HttpDelete]
        [Route("RefuseBookingRequest/{ticketID}")]
        public IActionResult RefuseBookingRequest(string ticketID) 
        {
            bool isRefused = _bookingService.RefuseBookingRequest(ticketID);
            if (isRefused)
            {
                return Ok();
            }

            throw new Exception("refusing booking reservation unsuccessfully.");
        }
        #endregion
        #region 5 - Method for load quick bookings
        [HttpGet]
        [Route("LoadQuickBookings/{username}")]
        public IActionResult LoadQuickBookings(string username) 
        {
            List<IQuickBookingResponseDTO> quickBookings = _bookingService.LoadQuickBookings(username);
            return Ok(quickBookings);
        }
        #endregion
        #region 6 - Method for load active/previous bookings
        [HttpGet]
        [Route("LoadMyBookings/{username}/{type}")]
        public IActionResult LoadMyBookings(string username, string type)
        {
            List<IQuickBookingResponseDTO> bookings = _bookingService.LoadMyBookings(username, type);
            return Ok(bookings);
        }
        #endregion
        #region 7 - Method for cancel booking
        [HttpPut]
        [Route("CancelBooking")]
        public IActionResult CancelBooking(BookingCancelRequestDTO bookingCancelRequestDTO) 
        {
            bool isCancelled = _bookingService.CancelBooking(bookingCancelRequestDTO);
            if (isCancelled)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Canceling booking unsuccessfully.");
        }
        #endregion
        #region 8 - Method for rating booking
        [HttpPut]
        [Route("RatingBooking/{flightID}/{rate}")]
        public IActionResult RatingBooking(string flightID, string rate)
        {
            bool rating = _bookingService.RatingBooking(flightID, rate);
            if (rating)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Rating booking unsuccessfully.");
        }
        #endregion
    }
}
