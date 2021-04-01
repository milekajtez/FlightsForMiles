using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Info_ID ----------- information identificator
    /// Title ------------- title od the information
    /// text -------------- text of information
    /// </summary>
    [Table("AboutSiteInformations")]
    public class Information
    {
        [Key]
        public Guid Info_ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Text { get; set; }
    }
}
