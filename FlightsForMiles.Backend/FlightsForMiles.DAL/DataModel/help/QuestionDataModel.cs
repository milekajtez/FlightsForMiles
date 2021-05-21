using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.DataModel.help
{
    public class QuestionDataModel : IQuestion
    {
        public Guid QuestionID { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
    }
}
