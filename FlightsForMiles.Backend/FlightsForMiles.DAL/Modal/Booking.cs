using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// UserID -------------- user pin (identifiator)
    /// FlightID ------------ flight ID
    /// TicketID ------------ ticket ID
    /// BookingStatus ------- status of booking ==> Waiting --- user waiting for validation transaction
    ///                                         ==> Valid ----- transaction is valid and added to blockchain
    /// Price --------------- how many bitcoins booking is costed
    /// TransactionID ------- transaction of booking
    /// </summary>
    [Table("Bookings")]
    public class Booking
    {
        [Key]
        public string TicketID { get; set; }

        [Required]
        public string UserID { get; set; }

        [Required]
        public int FlightID { get; set; }

        [Required]
        public string BookingStatus { get; set; }

        [Required]
        public double Price { get; set; }
        
        [Required]
        public double DiscountPrice { get; set; }

        [Required]
        public Guid TransactionID { get; set; }
    }
}
