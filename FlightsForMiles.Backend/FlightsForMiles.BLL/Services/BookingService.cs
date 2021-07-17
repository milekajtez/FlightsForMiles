using FlightsForMiles.BLL.Contracts.Services.Booking;
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
    }
}
