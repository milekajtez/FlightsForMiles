using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.help;
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
    }
}
