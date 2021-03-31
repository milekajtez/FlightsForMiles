using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Id ---------------------------- ticket's identificator
    /// Number_of_seat ---------------- number of seat
    /// Price ------------------------- price of ticket
    /// Ticket_type ------------------- type of the ticket
    /// Time_of_ticket_purchase ------- time of the ticket purchase
    /// Is_ticket_purchased ----------- is ticket purchased indetificator
    /// Is_quick_booking -------------- is this ticket for quick booking?
    /// Flight ------------------------ flight to which the ticket belongs
    /// </summary>
    [Table("Tickets")]
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Number_of_seat { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public TicketType Ticket_type { get; set; }

        public DateTime Time_of_ticket_purchase { get; set; }

        [Required]
        public bool Is_ticket_purchased { get; set; }

        [Required]
        public bool Is_quick_booking { get; set; }

        [Required]
        [JsonIgnore]
        public Flight Flight { get; set; }
    }

    public enum TicketType { ECONOMIC_CLASS, FIRST_CLASS, BUSINESS_CLASS };
}
