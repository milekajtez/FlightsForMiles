using FlightsForMiles.BLL.Contracts.DTO.Booking;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Booking
{
    public interface IBookingService
    {
        bool BookingWithoutFriends(IBookingWithoutFriendsRequestDTO bookingWithoutFriendsRequestDTO);
        bool BookingForFriends(IBookingForFriendsRequestDTO bookingForFriendsRequestDTO);
        bool ConfirmBookingRequest(string ticketID);
        bool RefuseBookingRequest(string ticketID);
        List<IQuickBookingResponseDTO> LoadQuickBookings(string username);
        List<IQuickBookingResponseDTO> LoadMyBookings(string username, string type);
        bool CancelBooking(IBookingCancelRequestDTO bookingCancelRequestDTO);
        bool RatingBooking(string flightID, string rate);
    }
}
