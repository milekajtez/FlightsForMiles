using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Help
{
    public interface IQuestionRequestDTO
    {
        public Guid QuestionID { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
    }
}
