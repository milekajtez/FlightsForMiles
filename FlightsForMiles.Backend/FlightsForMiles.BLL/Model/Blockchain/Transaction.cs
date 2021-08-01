using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Blockchain
{
    public class Transaction : ITransaction
    {
        public Transaction(string transactionID, string amount, string sender, string receiver,
            string siganture, string fees)
        {
            Validation(transactionID, amount, sender, receiver, siganture, fees);
            TransactionID = transactionID;
            Amount = amount;
            Sender = sender;
            Receiver = receiver;
            Signature = siganture;
            Fees = fees;
        }
        public string TransactionID { get; }
        public string Amount { get; }
        public string Sender { get; }
        public string Receiver { get; }
        public string Signature { get; }
        public string Fees { get; }

        #region Validation
        private void Validation(string transactionID, string amount, string sender, string receiver,
            string siganture, string fees)
        {
            if (string.IsNullOrWhiteSpace(transactionID) || !Guid.TryParse(transactionID, out _))
            {
                throw new ArgumentException(nameof(transactionID));
            }

            if (string.IsNullOrWhiteSpace(amount))
            {
                throw new ArgumentException(nameof(amount));
            }
            else 
            {
                if (!double.TryParse(amount, out _))
                {
                    throw new ArgumentException(nameof(amount));
                }
                else 
                {
                    if (double.Parse(amount) <= 0)
                    {
                        throw new ArgumentException(nameof(amount));
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(sender))
            {
                throw new ArgumentException(nameof(sender));
            }

            if (string.IsNullOrWhiteSpace(receiver))
            {
                throw new ArgumentException(nameof(receiver));
            }
            else 
            {
                if (receiver != "mainAdmin") 
                {
                    throw new ArgumentException(nameof(receiver));
                }
            }

            if (string.IsNullOrWhiteSpace(siganture))
            {
                throw new ArgumentException(nameof(siganture));
            }

            if (string.IsNullOrWhiteSpace(fees))
            {
                throw new ArgumentException(nameof(fees));
            }
            else
            {
                if (!double.TryParse(fees, out _))
                {
                    throw new ArgumentException(nameof(fees));
                }
                else
                {
                    if (double.Parse(fees) <= 0)
                    {
                        throw new ArgumentException(nameof(fees));
                    }
                }
            }
        }
        #endregion
    }
}
