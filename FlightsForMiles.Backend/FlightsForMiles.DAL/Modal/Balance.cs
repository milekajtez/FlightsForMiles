using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
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
