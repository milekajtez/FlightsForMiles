using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.airline;
using FlightsForMiles.DAL.Modal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class AirlineRepository : IAirlineRepository
    {
        private readonly ApplicationDbContext _context;
        public AirlineRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        #region 1 - Method for add new airline
        public async Task<long> AddAirline(IAirline newAirline)
        {
            var airlines = _context.Airlines;
            foreach (var air in airlines)
            {
                if (newAirline.Name.Equals(air.Name))
                {
                    throw new ArgumentException("Please enter a different airline name");
                }
            }

            Airline airline = new Airline()
            {
                Name = newAirline.Name,
                House_number = uint.Parse(newAirline.HouseNumber),
                Street = newAirline.Street,
                City = newAirline.City,
                Promotional_description = newAirline.Description,
                Pricelist = newAirline.Pricelist,
                Sum_of_all_grades = newAirline.SumOfAllGrades,
                Number_of_grades = newAirline.NumberOfGrades,
                Number_of_sold_tickets = newAirline.NumberOfSoldTickets
            };

            await _context.Airlines.AddAsync(airline);
            _context.SaveChanges();

            return airline.Id;
        }
        #endregion
        #region 2 - Load one airline
        public async Task<IAirline> LoadAirline(int id)
        {
            var resultFind = await _context.Airlines.FindAsync(id);
            if (resultFind != null) 
            {
                IAirline airline = new AirlineDataModel() 
                {
                    Id = resultFind.Id,
                    Name = resultFind.Name,
                    HouseNumber = resultFind.House_number.ToString(),
                    Street = resultFind.Street,
                    City = resultFind.City,
                    Description = resultFind.Promotional_description,
                    Pricelist = resultFind.Pricelist,
                    NumberOfGrades = resultFind.Number_of_grades,
                    NumberOfSoldTickets = resultFind.Number_of_sold_tickets,
                    SumOfAllGrades = resultFind.Sum_of_all_grades
                };

                return airline;
            }

            throw new NotImplementedException("Airline with this id (" + id + ") doesn't exsist.");
        }
        #endregion
        #region 3 - Method for load all airlines
        public List<IAirline> LoadAllAirlines()
        {
            var airlines =  _context.Airlines;
            if (airlines == null) 
            {
                throw new Exception("Server not found any airline bacause the airline table is empty.");
            }

            List<IAirline> result = new List<IAirline>();
            foreach (var air in airlines) 
            {
                result.Add(new AirlineDataModel() 
                {
                    Id = air.Id,
                    Name = air.Name,
                    HouseNumber = air.House_number.ToString(),
                    Street = air.Street,
                    City = air.City,
                    Description = air.Promotional_description,
                    Pricelist = air.Pricelist,
                    NumberOfGrades = air.Number_of_grades,
                    NumberOfSoldTickets = air.Number_of_sold_tickets,
                    SumOfAllGrades = air.Sum_of_all_grades
                });
            }

            return result;
        }
        #endregion
        #region 4 - Method for update airline
        public void UpdateAiriline(string airlineID, IAirline airline)
        {
            var resultFind = _context.Airlines.Find(int.Parse(airlineID));
            if (resultFind != null)
            {
                resultFind.Name = airline.Name != "" ? airline.Name : resultFind.Name;
                resultFind.House_number = airline.HouseNumber != "" ? uint.Parse(airline.HouseNumber) : resultFind.House_number;
                resultFind.Street = airline.Street != "" ? airline.Street : resultFind.Street;
                resultFind.City = airline.City != "" ? airline.City : resultFind.City;
                resultFind.Promotional_description = airline.Description != "" ? airline.Description : resultFind.Promotional_description;
                resultFind.Pricelist = airline.Pricelist != "" ? airline.Pricelist : resultFind.Pricelist;

                _context.Airlines.Update(resultFind);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException("Updating unsuccessfully. Server not found airline for updating.");
            }
        }
        #endregion
    }
}
