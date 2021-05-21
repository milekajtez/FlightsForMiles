using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Model.Help
{
    public class Question : IQuestion
    {
        public Question(Guid questionID, string questionText, string answer) 
        {
            Validation(questionID, questionText);

            QuestionID = questionID;
            QuestionText = questionText;
            Answer = answer;
        }
        public Guid QuestionID { get; }
        public string QuestionText { get; }
        public string Answer { get; }

        #region Validation
        private void Validation(Guid questionID, string questionText) 
        {
            if (questionID == null) 
            {
                throw new ArgumentException(nameof(questionID));
            }

            if (string.IsNullOrEmpty(questionText))
            {
                throw new ArgumentException(nameof(questionText));
            }
        }
        #endregion
    }
}
