using FlightsForMiles.BLL.Contracts.DTO.Help;
using FlightsForMiles.BLL.Contracts.Services.Help;
using FlightsForMiles.RequestDTO.Help;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpsController : ControllerBase
    {
        private readonly IHelpService _helpService;
        public HelpsController(IHelpService helpService)
        {
            _helpService = helpService;
        }

        #region 1 - Method for load application description
        [HttpGet]
        public IActionResult LoadAppDescription()
        {
            IAppDescriptionResponseDTO result = _helpService.LoadAppDescription();
            return Ok(result);
        }
        #endregion
        #region 2 - Method for update application description
        [HttpPut]
        public IActionResult UpdateAppDescription(AppDescriptionRequestDTO updatedAppDescription)
        {
            _helpService.UpdateAppDescription(updatedAppDescription);
            return NoContent();
        }
        #endregion
        #region 3 - Method for load questions
        [HttpGet]
        [Route("LoadQuestions")]
        public IActionResult LoadQuestions()
        {
            List<IQuestionResponseDTO> result = _helpService.LoadQuestions();
            return Ok(result);
        }
        #endregion
        #region 4 - Method for delete question
        [HttpDelete]
        [Route("{questionID}")]
        public IActionResult DeleteQuestion(string questionID)
        {
            bool isDeleted = _helpService.DeleteQuestion(questionID);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Question with sended id doesn't exsist.");
            
        }
        #endregion
        #region 5 - Method for update (answer) on question
        [HttpPut]
        [Route("UpdateQuestion")]
        public IActionResult UpdateQuestion(QuestionRequestDTO questionRequestDTO) 
        {
            _helpService.UpdateQuestion(questionRequestDTO);
            return NoContent();
        }
        #endregion
        #region 6 - Method for ask question
        [HttpPost]
        public IActionResult AddQuestion(AskQuestionRequestDTO question) 
        {
            Guid newQuestionID = _helpService.AddQuestion(question);
            return CreatedAtRoute("GetQuestion", new { id = newQuestionID }, question);
        }
        #endregion
        #region 7 - Get (Load one user)
        [HttpGet("{id}", Name = "GetQuestion")]
        public ActionResult GetGetQuestionUser(Guid id)
        {
            IQuestionResponseDTO newQuestion = _helpService.LoadQuestion(id);
            if (newQuestion != null)
            {
                return Ok(newQuestion);
            }

            return NotFound("Server not found a question.");
        }
        #endregion
    }
}
