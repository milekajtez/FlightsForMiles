using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// UserID ------------ user ID
    /// Dollars ----------- amount in dollars
    /// Bitcoins ---------- amount in bitcoins
    /// </summary>
    [Table("UsersBalance")]
    public class Balance
    {
        [Key]
        public string UserID { get; set; }

        [Required]
        public double Dollars { get; set; }

        [Required]
        public double Bitcoins { get; set; }
    }
}
