using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Id ------------------------ flight's identificator
    /// Start_time ---------------- start time of the flight
    /// End_time ------------------ end time of the flight
    /// Start_location ------------ start location of the flight
    /// End_location -------------- end location of the flight
    /// Flight_length_time -------- flight length (time)
    /// Flight_length_km ---------- flight length (kilometers)
    /// Sum_of_all_grades --------- sum of all flight's grades (Rating = Sum_of_all_grades / Number_of_grades)
    /// Number_of_grades ---------- number of flight's grades (Rating = Sum_of_all_grades / Number_of_grades)
    /// Additional_information ---- additional information about flight
    /// Number_of_transfers ------- number of flight's transfers
    /// All_transfers ------------- transfers of the flight
    /// Plane_name ---------------- name of the plane used in flight
    /// Lugage_weight ------------- laugage weight
    /// Airline ------------------- airline that organizes the flight
    /// Tickets ------------------- flight's tickets
    /// </summary>
    [Table("Flights")]
    public class Flight
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Start_time { get; set; }

        [Required]
        public DateTime End_time { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(30)]
        public string Start_location { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(30)]
        public string End_location { get; set; }

        [Required]
        public double Flight_length_time { get; set; }

        [Required]
        public double Flight_length_km { get; set; }

        [Required]
        public double Sum_of_all_grades { get; set; }

        [Required]
        public double Number_of_grades { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(500)]
        public string Additional_information { get; set; }

        [Required]
        public uint Number_of_transfers { get; set; }

        [Required]
        [MinLength(1)]
        public string All_transfers { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(100)]
        public string Plane_name { get; set; }

        [Required]
        public double Lugage_weight { get; set; }

        [Required]
        [JsonIgnore]
        public Airline Airline { get; set; }

        [Required]
        public ICollection<Ticket> Tickets { get; set; }

        // dodati
        // lista korisnika koji su rezervisali let
        /*public ICollection<RegisteredUserFlight> RegisteredUserFlights { get; set; }*/
    }
}
