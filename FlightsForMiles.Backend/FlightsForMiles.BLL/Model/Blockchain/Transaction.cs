using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Blockchain
{
    public class Transaction : ITransaction
    {
        public Transaction(string username, string flightID, string ticketID, string transactionID)
        {
            Validation(username, flightID, ticketID, transactionID);
            Username = username;
            FlightID = flightID;
            TicketID = ticketID;
            TransactionID = transactionID;
        }
        public string Username { get; }
        public string FlightID { get; }
        public string TicketID { get; }
        public string TransactionID { get; }

        #region Validation
        private void Validation(string username, string flightID, string ticketID, string transactionID)
        {
            if (string.IsNullOrWhiteSpace(transactionID) || !Guid.TryParse(transactionID, out _))
            {
                throw new ArgumentException(nameof(transactionID));
            }

            if (string.IsNullOrWhiteSpace(ticketID))
            {
                throw new ArgumentException(nameof(ticketID));
            }
            else 
            {
                if (!double.TryParse(ticketID, out _))
                {
                    throw new ArgumentException(nameof(ticketID));
                }
                else 
                {
                    if (double.Parse(ticketID) <= 0)
                    {
                        throw new ArgumentException(nameof(ticketID));
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(flightID))
            {
                throw new ArgumentException(nameof(flightID));
            }
            else
            {
                if (!double.TryParse(flightID, out _))
                {
                    throw new ArgumentException(nameof(flightID));
                }
                else
                {
                    if (double.Parse(flightID) <= 0)
                    {
                        throw new ArgumentException(nameof(flightID));
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ArgumentException(nameof(username));
            }
        }
        #endregion
    }
}
