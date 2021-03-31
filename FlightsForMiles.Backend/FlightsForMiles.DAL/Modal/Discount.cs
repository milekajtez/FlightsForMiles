using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// This table have only information abbount current types of discounts and their values
    /// Id ----------------------- discount's identificator
    /// Is_quick_reservation ----- is quick resevation discount
    /// Points_300 --------------- 300 points discount
    /// Points_600 --------------- 600 points discount
    /// Points_1200 -------------- 1200 points discount
    /// </summary>
    [Table("Discounts")]
    public class Discount
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public double Is_quick_reservation { get; set; }

        [Required]
        public double Points_300 { get; set; }

        [Required]
        public double Points_600 { get; set; }

        [Required]
        public double Points_1200 { get; set; }
    }
}
