using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// DestinationID ------------- identificator of the destination
    /// DestinationName ----------- name of the destination
    /// City ---------------------- city of the destination
    /// Country ------------------- country of the destination
    /// Airline ------------------- the airline to which the destination belongs
    /// </summary>
    [Table("Destinations")]
    public class Destination
    {
        [Key]
        public int Airport_ID { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(30)]
        public string Airport_name { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string Country { get; set; }

        [Required]
        [JsonIgnore]
        public Airline Airline { get; set; }
    }
}
