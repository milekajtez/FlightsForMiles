using FlightsForMiles.BLL.Contracts.DTO.Help;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Help
{
    public class QuestionRequestDTO : IQuestionRequestDTO
    {
        public Guid QuestionID { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
    }
}
