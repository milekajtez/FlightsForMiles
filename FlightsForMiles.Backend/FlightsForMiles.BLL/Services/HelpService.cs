using FlightsForMiles.BLL.Contracts.DTO.Help;
using FlightsForMiles.BLL.Contracts.Services.Help;
using FlightsForMiles.BLL.Model.Help;
using FlightsForMiles.BLL.ResponseDTO.Help;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class HelpService : IHelpService
    {
        private readonly IHelpRepository _helpRepository;
        public HelpService(IHelpRepository helpRepository) 
        {
            _helpRepository = helpRepository;
        }

        #region 1 - Method for load application description
        public IAppDescriptionResponseDTO LoadAppDescription()
        {
            return ConvertAppDescriptionObjectToResponse(_helpRepository.LoadAppDescription());
        }
        #endregion
        #region 2 - Method for update application description
        public void UpdateAppDescription(IAppDescriptionRequestDTO appDescriptionRequestDTO)
        {
            bool isUpdated = _helpRepository.UpdateAppDescription(ConvertAppDescriptionRequestObjectToAppDescription(appDescriptionRequestDTO)).Result;
            if (!isUpdated) 
            {
                throw new ArgumentException("Update unsuccessfully. Server not found any pplication description.");
            }
        }
        #endregion
        #region 3 - Method for load questions
        public List<IQuestionResponseDTO> LoadQuestions()
        {
            List<IQuestionResponseDTO> result = new List<IQuestionResponseDTO>();
            List<IQuestion> questions = _helpRepository.LoadQuestions();

            foreach (var quest in questions) 
            {
                result.Add(ConvertQuestionObjectToResponse(quest));
            }

            return result;
        }

        #endregion
        #region 4 - Method for delete question
        public bool DeleteQuestion(string questionID)
        {
            DeleteQuestionValidation(questionID);
            return _helpRepository.DeleteQuestion(questionID).Result;
        }
        #endregion
        #region 5 - Method for update (answer) on question
        public void UpdateQuestion(IQuestionRequestDTO questionRequestDTO)
        {
            bool isUpdated = _helpRepository.UpdateQuestion(ConverQuestionRequestObjectToQuestion(questionRequestDTO)).Result;
            if (!isUpdated)
            {
                throw new ArgumentException("Update unsuccessfully. Server not found any question.");
            }
        }
        #endregion

        #region Converting methods
        private IAppDescriptionResponseDTO ConvertAppDescriptionObjectToResponse(IAppDescription appDescription) 
        {
            return new AppDescriptionResponseDTO()
            {
                Description = appDescription.Description
            };
        }

        private IAppDescription ConvertAppDescriptionRequestObjectToAppDescription(IAppDescriptionRequestDTO appDescriptionRequestDTO) 
        {
            return new AppDescription(appDescriptionRequestDTO.Description);
        }

        private IQuestionResponseDTO ConvertQuestionObjectToResponse(IQuestion question) 
        {
            return new QuestionResponseDTO()
            {
                QuestionID = question.QuestionID,
                QuestionText = question.QuestionText,
                Answer = question.Answer
            };
        }

        private IQuestion ConverQuestionRequestObjectToQuestion(IQuestionRequestDTO questionRequestDTO) 
        {
            return new Question(questionRequestDTO.QuestionID, questionRequestDTO.QuestionText, questionRequestDTO.Answer);
        }
        #endregion
        #region Validation method
        private void DeleteQuestionValidation(string questionID)
        {
            if (string.IsNullOrEmpty(questionID) || !Guid.TryParse(questionID, out _))
            {
                throw new ArgumentException(nameof(questionID));
            }
        }
        #endregion
    }
}
