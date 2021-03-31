using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Sender_pin ----------- personal identify number of the request sender
    /// Reciever_pin --------- personal identify number of the request receiver
    /// Request_accepted ----- identificator which indicates state of the current friendship request
    ///                       ( true - accepted 
    ///                         false - on waiting
    ///                         If request was denied, then it will be deleted
    ///                       )
    /// </summary>
    [Table("FriendshipRequests")]
    public class FriendshipRequest
    {
        public long Sender_pin { get; set; }
        public long Reciever_pin { get; set; }

        [Required]
        public bool Request_accepted { get; set; }
    }
}
