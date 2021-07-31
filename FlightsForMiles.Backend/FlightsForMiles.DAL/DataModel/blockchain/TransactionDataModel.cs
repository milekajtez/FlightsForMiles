using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.blockchain
{
    public class TransactionDataModel : ITransaction
    {
        public string TransactionID { get; set; }
        public string Amount { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Signature { get; set; }
        public string Fees { get; set; }
    }
}
