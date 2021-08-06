using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Booking
{
    public class BookingForFriends : IBookingForFriends
    {
        public BookingForFriends(string username, List<string> friends, List<string> ticketsID, string flightID) 
        {
            Validation(username, friends, ticketsID, flightID);
            Username = username;
            Friends = friends;
            TicketsID = ticketsID;
            FlightID = flightID;
        }

        public string Username { get; }
        public List<string> Friends { get; }
        public List<string> TicketsID { get; }
        public string FlightID { get; }

        #region Validation
        private void Validation(string username, List<string> friends, List<string> ticketsID, string flightID) 
        {
            if (string.IsNullOrWhiteSpace(flightID) || !int.TryParse(flightID, out _))
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (friends.Count < 1)
            {
                throw new ArgumentException(nameof(friends));
            }
            else 
            {
                foreach (var friend in friends) 
                {
                    if (string.IsNullOrWhiteSpace(friend))
                    {
                        throw new ArgumentException(nameof(friend));
                    }
                }
            }

            if (ticketsID.Count < 1)
            {
                throw new ArgumentException(nameof(ticketsID));
            }
            else
            {
                foreach (var ticket in ticketsID)
                {
                    if (string.IsNullOrWhiteSpace(ticket) || !int.TryParse(ticket, out _))
                    {
                        throw new ArgumentException(nameof(ticket));
                    }
                }
            }

            if (ticketsID.Count != friends.Count) 
            {
                throw new ArgumentException("Number of tickets and selected friends must be same number");
            }
        }
        #endregion
    }
}
