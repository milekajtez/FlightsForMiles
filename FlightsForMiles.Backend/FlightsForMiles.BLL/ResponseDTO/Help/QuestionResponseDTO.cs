using FlightsForMiles.BLL.Contracts.DTO.Help;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.ResponseDTO.Help
{
    public class QuestionResponseDTO : IQuestionResponseDTO
    {
        public Guid QuestionID { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
    }
}
