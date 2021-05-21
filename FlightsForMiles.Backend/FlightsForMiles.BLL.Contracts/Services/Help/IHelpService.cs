using FlightsForMiles.BLL.Contracts.DTO.Help;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Help
{
    public interface IHelpService
    {
        IAppDescriptionResponseDTO LoadAppDescription();
        void UpdateAppDescription(IAppDescriptionRequestDTO appDescriptionRequestDTO);
        List<IQuestionResponseDTO> LoadQuestions();
        bool DeleteQuestion(string questionID);
        void UpdateQuestion(IQuestionRequestDTO questionRequestDTO);
    }
}
