using FlightsForMiles.BLL.Contracts.DTO.Booking;
using FlightsForMiles.BLL.Contracts.Services.Booking;
using FlightsForMiles.BLL.Model.Booking;
using FlightsForMiles.BLL.ResponseDTO.Booking;
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
        public string BookingWithoutFriends(IBookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO)
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
        #region 5 - Method for load quick bookings
        public List<IQuickBookingResponseDTO> LoadQuickBookings(string username)
        {
            UsernameValidation(username);
            List<IQuickBookingResponseDTO> result = new List<IQuickBookingResponseDTO>();
            List<IQuickBooking> quickBookings = _bookingRepository.LoadQuickBookings(username).Result;
            foreach (var quickBook in quickBookings) 
            {
                result.Add(ConvertQuickBookingToResponseObject(quickBook));
            }

            return result;
        }
        #endregion
        #region 6 - Method for load active bookings
        public List<IQuickBookingResponseDTO> LoadMyBookings(string username, string type)
        {
            UsernameValidation(username);
            BookingTypeValidation(type);
            List<IQuickBookingResponseDTO> result = new List<IQuickBookingResponseDTO>();
            List<IQuickBooking> bookings = _bookingRepository.LoadMyBookings(username, type).Result;
            foreach (var book in bookings)
            {
                result.Add(ConvertQuickBookingToResponseObject(book));
            }

            return result;
        }
        #endregion
        #region 7 - Method for cancel booking
        public bool CancelBooking(IBookingCancelRequestDTO bookingCancelRequestDTO)
        {
            if (bookingCancelRequestDTO == null) 
            {
                throw new ArgumentException(nameof(bookingCancelRequestDTO));
            }
            ICancelBooking cancelBooking = ConvertRequestObjectToCancelBooking(bookingCancelRequestDTO);
            return _bookingRepository.CancelBooking(cancelBooking).Result;
        }
        #endregion
        #region 8 - Method for rating booking
        public bool RatingBooking(string flightID, string rate)
        {
            ValidationTicketID(flightID);
            ValidationRate(rate);
            return _bookingRepository.RatingBooking(flightID, rate).Result;
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

        private ICancelBooking ConvertRequestObjectToCancelBooking(IBookingCancelRequestDTO bookingCancelRequestDTO)
        {
            return new CancelBooking(bookingCancelRequestDTO.TicketID, bookingCancelRequestDTO.BitcoinPrice,
                bookingCancelRequestDTO.DollarPrice);
        }

        private IQuickBookingResponseDTO ConvertQuickBookingToResponseObject(IQuickBooking quickBooking) 
        {
            return new QuickBookingResponseDTO() 
            {
                TicketID = quickBooking.TicketID,
                FlightID = quickBooking.FlightID,
                StartLocation = quickBooking.StartLocation,
                EndLocation = quickBooking.EndLocation,
                StartTime = quickBooking.StartTime,
                EndTime = quickBooking.EndTime,
                TicketNumber = quickBooking.TicketNumber,
                OriginalPrice = quickBooking.OriginalPrice,
                DiscountPrice = quickBooking.DiscountPrice,
                OriginalBitcoinPrice = quickBooking.OriginalBitcoinPrice,
                DiscountBitcoinPrice = quickBooking.DiscountBitcoinPrice
            };
        }
        #endregion
        #region Validation ticket ID, username and booking type
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

        private void ValidationRate(string rate)
        {
            if (string.IsNullOrWhiteSpace(rate))
            {
                throw new ArgumentException(nameof(rate));
            }
            else
            {
                if (!int.TryParse(rate, out int _))
                {
                    throw new ArgumentException(nameof(rate));
                }
                else
                {
                    if (int.Parse(rate) < 0)
                    {
                        throw new ArgumentException(nameof(rate));
                    }
                }
            }
        }

        private void UsernameValidation(string username) 
        {
            if (string.IsNullOrWhiteSpace(username)) 
            {
                throw new ArgumentException(nameof(username));
            }
        }

        private void BookingTypeValidation(string type) 
        {
            if (string.IsNullOrWhiteSpace(type))
            {
                throw new ArgumentException(nameof(type));
            }
            else 
            {
                if (!type.Equals("active") && !type.Equals("previous")) 
                {
                    throw new ArgumentException("Unknown booking type.");
                }
            }
        }
        #endregion
    }
}
