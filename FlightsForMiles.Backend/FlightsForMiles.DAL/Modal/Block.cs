using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Id ----------------------- block ID
    /// Index -------------------- block's index
    /// Timestamp ---------------- time of block creation
    /// Proof -------------------- block proof
    /// PreviousHash ------------- hash of previous block
    /// Hash --------------------- hash of current block
    /// Transactions ------------- block has 5 transactions
    /// </summary>
    [Table("Blocks")]
    public class Block
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Index { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public int Proof { get; set; }

        [Required]
        public string PreviousHash { get; set; }

        [Required]
        public string Hash { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
    }
}
