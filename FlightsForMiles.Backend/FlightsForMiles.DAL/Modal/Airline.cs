using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Id -------------------------------- airline identificator
    /// Name ------------------------------ name of the airline
    /// Address --------------------------- address of the airline
    /// Promotional_description ----------- promotional description of the airline 
    /// Sum_of_all_grades ----------------- sum of all airline's grades (Rating = Sum_of_all_grades / Number_of_grades)
    /// Number_of_grades ------------------ number of airline's grades (Rating = Sum_of_all_grades / Number_of_grades)
    /// Pricelist ------------------------- airline's pricelist
    /// Number_of_sold_tickets ------------ number of sold tickets
    /// Destinations ---------------------- airline's destinations
    /// Flights --------------------------- airline's flights
    /// </summary>
    [Table("Airlines")]
    public class Airline
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(100)]
        public string Address { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(1000)]
        public string Promotional_description { get; set; }

        [Required]
        public double Sum_of_all_grades { get; set; }
        
        [Required]
        public double Number_of_grades { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(1000)]
        public string Pricelist { get; set; }

        [Required]
        public int Number_of_sold_tickets { get; set; }

        [Required]
        public ICollection<Destination> Destinations { get; set; }

        [Required]
        public ICollection<Flight> Flights { get; set; }
    }
}
