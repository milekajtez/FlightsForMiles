using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface ITransaction
    {
        public string TransactionID { get; }
        public string Amount { get; }
        public string Sender { get; }
        public string Receiver { get; }
        public string Signature { get; }
        public string Fees { get; }
    }
}
