using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IHelpRepository
    {
        IAppDescription LoadAppDescription();
        Task<bool> UpdateAppDescription(IAppDescription description);
        List<IQuestion> LoadQuestions();
        Task<bool> DeleteQuestion(string questionID);
        Task<bool> UpdateQuestion(IQuestion question);
        Task<Guid> AddQuestion(IQuestion question);
    }
}
