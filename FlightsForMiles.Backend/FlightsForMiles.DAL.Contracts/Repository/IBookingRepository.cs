﻿using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IBookingRepository
    {
        Task<bool> BookingWithoutFriends(IBookingWithoutFriends bookingWithoutFriends);
        Task<bool> BookingForFriends(IBookingForFriends bookingForFriends);
        Task<bool> ConfirmBookingRequest(string ticketID);
        Task<bool> RefuseBookingRequest(string ticketID);
    }
}
