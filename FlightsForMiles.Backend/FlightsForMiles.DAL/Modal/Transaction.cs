using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Id ----------------------------- transaction ID
    /// Amount ------------------------- amount in transaction (prive of booking)
    /// RecipientPublicKey ------------- recipent public key
    /// SenderPublicKey ---------------- sender public key
    /// Signature ---------------------- transaction's siganture
    /// Fees --------------------------- fees for adding transaction to blockchin
    /// IsValid ------------------------ is transaction valid?
    /// Block -------------------------- transaction is in this block
    /// </summary>
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

        [JsonIgnore]
        public Block Block { get; set; }
    }
}
