using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL.Contracts.Model
{
    public interface IQuestion
    {
        public Guid QuestionID { get; }
        public string QuestionText { get; }
        public string Answer { get; }
    }
}
