using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.help;
using FlightsForMiles.DAL.Modal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class HelpRepository : IHelpRepository
    {
        private readonly ApplicationDbContext _context;
        public HelpRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        #region 1 - Method for load application description
        public IAppDescription LoadAppDescription()
        {
            AppDescriptionDataModel appDescription = new AppDescriptionDataModel();

            var description = _context.Informations;
            if (description != null) 
            {
                foreach (var desc in description) 
                {
                    appDescription.Description = desc.Text;
                    break;
                }

                return appDescription;
            }

            throw new Exception("Server not faound any data about application description.");
        }
        #endregion
        #region 2 - Method for update application description
        public async Task<bool> UpdateAppDescription(IAppDescription description)
        {
            var currentDescription = _context.Informations;
            if (currentDescription != null) 
            {
                foreach (var curr in currentDescription) 
                {
                    curr.Text = description.Description;
                    _context.Update(curr);

                    break;
                }

                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
        #endregion
        #region 3 - Method for load questions
        public List<IQuestion> LoadQuestions()
        {
            var allQuestions = _context.Questions;
            List<IQuestion> result = new List<IQuestion>();

            foreach (var question in allQuestions) 
            {
                result.Add(new QuestionDataModel()
                {
                    QuestionID = question.Question_ID,
                    QuestionText = question.Question_text,
                    Answer = question.Answer_text
                });
            }

            return result;
        }
        #endregion
        #region 4 - Method for delete question
        public async Task<bool> DeleteQuestion(string questionID)
        {
            var resultFind = await _context.Questions.FindAsync(Guid.Parse(questionID));
            if (resultFind != null)
            {
                _context.Questions.Remove(resultFind);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region 5 - Method for udpate (answer) to question
        public async Task<bool> UpdateQuestion(IQuestion question)
        {
            var resultFind = await _context.Questions.FindAsync(question.QuestionID);
            if (resultFind != null) 
            {
                resultFind.Answer_text = question.Answer;
                _context.Questions.Update(resultFind);
                await _context.SaveChangesAsync();

                return true;
            }

            return false;
        }
        #endregion
        #region 6 - Method for ask question
        public async Task<Guid> AddQuestion(IQuestion question)
        {
            var resultFind = await _context.Questions.FindAsync(question.QuestionID);
            if (resultFind == null) 
            {
                var questions = _context.Questions;
                foreach (var quest in questions) 
                {
                    if (quest.Question_text.Equals(question.QuestionText)) 
                    {
                        throw new Exception("Add question unsuccessfully. We already have the same question. Please find that in Help window.");
                    }
                }

                Question newQuestion = new Question() 
                {
                    Question_ID = question.QuestionID,
                    Question_text = question.QuestionText,
                    Answer_text = question.Answer
                };

                await _context.Questions.AddAsync(newQuestion);
                await _context.SaveChangesAsync();

                return newQuestion.Question_ID;
            }

            throw new Exception("Add question unsuccessfully because server can't to add new question currently.");
        }
        #endregion
    }
}
