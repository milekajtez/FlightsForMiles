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
    }
}
