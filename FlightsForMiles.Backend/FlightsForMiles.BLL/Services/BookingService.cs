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
        #region 2 - Method for booking for friends
        public bool BookingForFriends(IBookingForFriendsRequestDTO bookingForFriendsRequestDTO)
        {
            if (bookingForFriendsRequestDTO == null)
            {
                throw new ArgumentException(nameof(bookingForFriendsRequestDTO));
            }

            IBookingForFriends bookingForFriends = ConvertRequestObjectToBookingForFriends(bookingForFriendsRequestDTO);
            return _bookingRepository.BookingForFriends(bookingForFriends).Result;
        }
        #endregion
        #region 3 - Method for confirm booking reservation
        public bool ConfirmBookingRequest(string ticketID)
        {
            ValidationTicketID(ticketID);
            return _bookingRepository.ConfirmBookingRequest(ticketID).Result;
        }
        #endregion
        #region 4 - Method for refuse booking reservation
        public bool RefuseBookingRequest(string ticketID)
        {
            ValidationTicketID(ticketID);
            return _bookingRepository.RefuseBookingRequest(ticketID).Result;
        }
        #endregion

        #region Converting methods
        private IBookingWithoutFriends ConvertRequestObjectToBookingWithoutFriends(IBookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO) 
        {
            return new BookingWithoutFriends(bookingWithoutFriendsRequestDTO.FlightID, bookingWithoutFriendsRequestDTO.TicketID,
                bookingWithoutFriendsRequestDTO.Username);
        }

        private IBookingForFriends ConvertRequestObjectToBookingForFriends(IBookingForFriendsRequestDTO bookingForFriendsRequestDTO)
        {
            return new BookingForFriends(bookingForFriendsRequestDTO.Username, bookingForFriendsRequestDTO.Friends,
                bookingForFriendsRequestDTO.Tickets, bookingForFriendsRequestDTO.FlightID);
        }
        #endregion
        #region Validation ticket ID
        private void ValidationTicketID(string ticketID) 
        {
            if (string.IsNullOrWhiteSpace(ticketID))
            {
                throw new ArgumentException(nameof(ticketID));
            }
            else 
            {
                if (!int.TryParse(ticketID, out int _))
                {
                    throw new ArgumentException(nameof(ticketID));
                }
                else 
                {
                    if (int.Parse(ticketID) < 1)
                    {
                        throw new ArgumentException(nameof(ticketID));
                    }
                }
            }
        }
        #endregion
    }
}
