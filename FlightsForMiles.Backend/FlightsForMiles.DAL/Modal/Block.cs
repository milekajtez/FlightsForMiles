using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    [Table("Blocks")]
    public class Block
    {
        [Key]
        public string Id { get; set; }

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

        [Required]
        public List<Transaction> Transactions { get; set; }
    }
}
