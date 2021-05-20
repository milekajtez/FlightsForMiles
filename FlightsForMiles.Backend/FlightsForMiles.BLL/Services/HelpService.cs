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
        #endregion
    }
}
