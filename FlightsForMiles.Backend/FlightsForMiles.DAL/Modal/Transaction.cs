using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace FlightsForMiles.DAL.Modal
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public string RecipientPublicKey { get; set; }

        [Required]
        public string SenderPublicKey { get; set; }

        [Required]
        public string Signature { get; set; }

        [Required]
        public double Fees { get; set; }

        [Required]
        public bool IsValid { get; set; }

        [Required]
        [JsonIgnore]
        public Block Block { get; set; }
    }
}
