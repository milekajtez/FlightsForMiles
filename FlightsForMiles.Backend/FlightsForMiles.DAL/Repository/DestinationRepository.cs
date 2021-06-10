using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.destination;
using FlightsForMiles.DAL.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly ApplicationDbContext _context;
        public DestinationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        #region 1 - Method for add new destination
        public async Task<long> AddDestination(IDestination newDestination)
        {
            var airline = await _context.Airlines.FindAsync(int.Parse(newDestination.AirlineID));
            if (airline != null) 
            {
                Destination destination = new Destination()
                {
                    Airport_name = newDestination.AirportName,
                    City = newDestination.City,
                    Country = newDestination.Country,
                    Airline = airline
                };

                await _context.Destinations.AddAsync(destination);
                _context.SaveChanges();

                return destination.Airport_ID;      // Ailrine_ID
            }

            throw new KeyNotFoundException("Add destination is unsuccessffully. Server not found selected airline.");
        }
        #endregion
        #region 2 - Method for load one destination
        public async Task<IDestination> LoadDestination(int id)
        {
            var resultFind = await _context.Destinations.FindAsync(id);
            if (resultFind != null)
            {
                IDestination destination = new DestinationDataModel()
                {
                    AirportID = resultFind.Airport_ID,
                    AirportName = resultFind.Airport_name,
                    City = resultFind.City,
                    Country = resultFind.Country,
                    AirlineID  = resultFind.Airline.Id.ToString()
                };

                return destination;
            }

            throw new NotImplementedException("Destination with this id (" + id + ") doesn't exsist.");
        }
        #endregion
        #region 3 - Method for load all destinations
        public List<IDestination> LoadAllDestinations()
        {
            var destinations = _context.Destinations.Include(a => a.Airline);
            if (destinations == null)
            {
                throw new Exception("Server not found any destination bacause the airline table is empty.");
            }

            List<IDestination> result = new List<IDestination>();
            foreach (var dest in destinations)
            {
                result.Add(new DestinationDataModel()
                {
                    AirportID = dest.Airport_ID,
                    AirportName = dest.Airport_name,
                    City = dest.City,
                    Country = dest.Country,
                    AirlineID = dest.Airline.Id.ToString() + " - " + dest.Airline.Name
                });
            }

            return result;
        }
        #endregion
        #region 4 - Method for delete destination
        public async Task<bool> DeleteDestination(string destinationID)
        {
            var resultFind = await _context.Destinations.FindAsync(int.Parse(destinationID));
            if (resultFind != null) 
            {
                _context.Destinations.Remove(resultFind);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region 5 - Method for update destination
        public void UpdateDestination(string destinationID, IDestination destination)
        {
            var resultFind = _context.Destinations.Find(int.Parse(destinationID));
            if (resultFind != null)
            {
                resultFind.Airport_name = destination.AirportName != "" ? destination.AirportName : resultFind.Airport_name;
                resultFind.City = destination.City != "" ? destination.City : resultFind.City;
                resultFind.Country = destination.Country != "" ? destination.Country : resultFind.Country;

                _context.Destinations.Update(resultFind);
                _context.SaveChanges();
            }
            else 
            {
                throw new KeyNotFoundException("Updating unsuccessfully. Server not found destination for updating.");
            }
        }
        #endregion
    }
}
