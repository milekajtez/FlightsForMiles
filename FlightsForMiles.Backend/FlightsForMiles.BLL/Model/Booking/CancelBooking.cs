using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Booking
{
    public class CancelBooking : ICancelBooking
    {
        public CancelBooking(string ticketID, string bitcoinPrice, string dollarPrice) 
        {
            Validation(ticketID, bitcoinPrice, dollarPrice);
            TicketID = ticketID;
            BitcoinPrice = bitcoinPrice;
            DollarPrice = dollarPrice;
        }

        public string TicketID { get; }
        public string BitcoinPrice { get; }
        public string DollarPrice { get; }

        #region Validation
        private void Validation(string ticketID, string bitcoinPrice, string dollarPrice) 
        {
            if (string.IsNullOrWhiteSpace(ticketID))
            {
                throw new ArgumentException(nameof(ticketID));
            }
            else 
            {
                if (!int.TryParse(ticketID, out _)) 
                {
                    throw new ArgumentException(nameof(ticketID));
                }
            }

            if (string.IsNullOrWhiteSpace(bitcoinPrice))
            {
                throw new ArgumentException(nameof(bitcoinPrice));
            }
            else
            {
                if (!double.TryParse(bitcoinPrice, out _))
                {
                    throw new ArgumentException(nameof(bitcoinPrice));
                }
                else 
                {
                    if (double.Parse(bitcoinPrice) < 0)
                    {
                        throw new ArgumentException(nameof(bitcoinPrice));
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(dollarPrice))
            {
                throw new ArgumentException(nameof(dollarPrice));
            }
            else
            {
                if (!double.TryParse(dollarPrice, out _))
                {
                    throw new ArgumentException(nameof(dollarPrice));
                }
                else
                {
                    if (double.Parse(dollarPrice) < 0)
                    {
                        throw new ArgumentException(nameof(dollarPrice));
                    }
                }
            }
        }
        #endregion
    }
}
