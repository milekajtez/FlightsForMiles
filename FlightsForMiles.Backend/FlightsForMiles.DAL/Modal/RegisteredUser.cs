using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Fields, Username, E-mail, Password i Telephone number doesn't add because they are in AspNetUsers table already 
    /// NumberOfPassport -------- number of passport
    /// FirstName --------------- first name
    /// LastName ---------------- last name
    /// City -------------------- city
    /// FirstLogin -------------- user is logged first time or not indentificator
    /// IsNewReservation -------- new reservation identificator 
    /// Points ------------------ user points
    /// </summary>
    [Table("Users")]
    public class RegisteredUser : IdentityUser
    {
        public string NumberOfPassport { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        public string Address { get; set; }

        public bool FirstLogin { get; set; }

        public bool IsNewReservation { get; set; }

        [Required]
        public double Points { get; set; }

        [Required]
        public ICollection<Ticket> Tickets { get; set; }
    }
}
