using FlightsForMiles.BLL.Contracts.DTO.Booking;
using FlightsForMiles.BLL.Contracts.Services.Booking;
using FlightsForMiles.BLL.Model.Booking;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        public BookingService(IBookingRepository bookingRepository) 
        {
            _bookingRepository = bookingRepository;
        }

        #region 1 - Method for booking without friends
        public bool BookingWithoutFriends(IBookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO)
        {
            if (bookingWithoutFriendsRequestDTO == null) 
            {
                throw new ArgumentException(nameof(bookingWithoutFriendsRequestDTO));
            }

            IBookingWithoutFriends bookingWithoutFriends = ConvertRequestObjectToBookingWithoutFriends(bookingWithoutFriendsRequestDTO);
            return _bookingRepository.BookingWithoutFriends(bookingWithoutFriends).Result;

        }
        #endregion

        #region Converting methods
        private IBookingWithoutFriends ConvertRequestObjectToBookingWithoutFriends(IBookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO) 
        {
            return new BookingWithoutFriends(bookingWithoutFriendsRequestDTO.FlightID, bookingWithoutFriendsRequestDTO.TicketID,
                bookingWithoutFriendsRequestDTO.Username);
        }
        #endregion
    }
}
