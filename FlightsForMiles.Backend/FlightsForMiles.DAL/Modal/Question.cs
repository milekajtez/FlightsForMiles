using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlightsForMiles.DAL.Modal
{
    /// <summary>
    /// Question_ID ------------- question identificator
    /// Question_text ----------- question
    /// Answer_text ------------- answer
    /// </summary>
    [Table("Questions")]
    public class Question
    {
        [Key]
        public Guid Question_ID { get; set; }

        [Required]
        public string Question_text { get; set; }

        [Required]
        public string Answer_text { get; set; }
    }
}
