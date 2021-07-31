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
    /// </summary>
    [Table("Bookings")]
    public class Booking
    {
        [Key]
        public string UserID { get; set; }

        [Required]
        public int FlightID { get; set; }

        [Required]
        public int TicketID {get; set;}

        [Required]
        public string BookingStatus { get; set; }
    }
}
