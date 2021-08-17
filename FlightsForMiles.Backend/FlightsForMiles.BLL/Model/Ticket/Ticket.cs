using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Ticket
{
    public class Ticket : ITicket
    {
        public Ticket(int ticketID, string airline, string number, string type, string price, string timePurchased,
            string isPurchased, string isQuickBooking, string flightID, string startLocation, string endLocation) 
        {
            Validation(ticketID, airline, number, type, price, timePurchased, isPurchased, isQuickBooking, flightID, startLocation, endLocation);

            TicketID = ticketID;
            Airline = airline;
            Number = number;
            Type = type;
            Price = price;
            TimePurchased = timePurchased;
            IsPurchased = isPurchased;
            IsQuickBooking = isQuickBooking;
            FlightID = flightID;
            StartLocation = startLocation;
            EndLocation = endLocation;
        }

        public int TicketID { get; }
        public string Airline { get; }
        public string Number { get; }
        public string Type { get; }
        public string Price { get; }
        public string TimePurchased { get; }
        public string IsPurchased { get; }
        public string IsQuickBooking { get; }
        public string FlightID { get; }
        public string StartLocation { get; }
        public string EndLocation { get; }
        public string BitcoinPrice { get; }

        #region Validation
        private void Validation(int ticketID, string airline, string number, string type, string price, string timePurchased,
            string isPurchased, string isQuickBooking, string flightID, string startLocation, string endLocation) 
        {
            if (ticketID != 0) 
            {
                throw new ArgumentException(nameof(ticketID));
            }

            if (!string.IsNullOrEmpty(airline)) 
            {
                throw new ArgumentException(nameof(airline));
            }

            if (string.IsNullOrWhiteSpace(number) || !int.TryParse(number, out int _))
            {
                throw new ArgumentException(nameof(number));
            }
            else 
            {
                if (int.Parse(number) <= 0) 
                {
                    throw new ArgumentException(nameof(number));
                }
            }

            if (string.IsNullOrWhiteSpace(type) || (!type.Equals("BUSINESS") && !type.Equals("FIRST") && !type.Equals("ECONOMIC")))
            {
                throw new ArgumentException(nameof(type));
            }

            if (string.IsNullOrWhiteSpace(price) || !double.TryParse(price, out double _))
            {
                throw new ArgumentException(nameof(price));
            }
            else
            {
                if (double.Parse(price) <= 0)
                {
                    throw new ArgumentException(nameof(price));
                }
            }

            if (!string.IsNullOrEmpty(timePurchased))
            {
                throw new ArgumentException(nameof(timePurchased));
            }

            if (!string.IsNullOrEmpty(isPurchased))
            {
                throw new ArgumentException(nameof(isPurchased));
            }

            if (string.IsNullOrWhiteSpace(isQuickBooking) || (!isQuickBooking.Equals("YES") && !isQuickBooking.Equals("NO")))
            {
                throw new ArgumentException(nameof(isQuickBooking));
            }

            if (string.IsNullOrWhiteSpace(flightID) || !int.TryParse(number, out int _))
            {
                throw new ArgumentException(nameof(flightID));
            }

            if (!string.IsNullOrEmpty(startLocation))
            {
                throw new ArgumentException(nameof(startLocation));
            }

            if (!string.IsNullOrEmpty(endLocation))
            {
                throw new ArgumentException(nameof(endLocation));
            }
        }
        #endregion
    }
}
