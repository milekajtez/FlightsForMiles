using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Booking
{
    public class BookingWithoutFriends : IBookingWithoutFriends
    {
        public BookingWithoutFriends(string flightID, string ticketID, string username) 
        {
            Validation(flightID, ticketID, username);
            FlightID = flightID;
            TicketID = ticketID;
            Username = username;
        }

        public string FlightID { get; }
        public string TicketID { get; }
        public string Username { get; }

        #region Validation
        private void Validation(string flightID, string ticketID, string username) 
        {
            if (string.IsNullOrWhiteSpace(flightID) || !int.TryParse(flightID, out _)) 
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (string.IsNullOrWhiteSpace(ticketID) || !int.TryParse(ticketID, out _))
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(nameof(flightID));
            }
        }
        #endregion
    }
}
