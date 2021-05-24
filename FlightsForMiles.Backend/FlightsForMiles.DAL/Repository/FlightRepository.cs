using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.flight;
using FlightsForMiles.DAL.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class FlightRepository : IFlightRepository
    {
        private readonly ApplicationDbContext _context;
        public FlightRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        #region 1 - Method for add new flight
        public async Task<long> AddFlight(IFlight newFlight)
        {
            var airline = await _context.Airlines.FindAsync(int.Parse(newFlight.AirlineID));
            if (airline != null)
            {
                Flight flight = new Flight()
                {
                    Start_time = DateTime.Parse(newFlight.StartTime),
                    End_time = DateTime.Parse(newFlight.EndTime),
                    Start_location = newFlight.StartLocation,
                    End_location = newFlight.EndLocation,
                    Flight_length_time = double.Parse(newFlight.FlightTime),
                    Flight_length_km = double.Parse(newFlight.FlightLengthKM),
                    Sum_of_all_grades = newFlight.SumOfAllGrades,
                    Additional_information = newFlight.AdditionalInformation,
                    All_transfers = newFlight.AllTransfers,
                    Lugage_weight = double.Parse(newFlight.LugageWeight),
                    Number_of_grades = newFlight.NumberOfGrades,
                    Number_of_transfers = uint.Parse(newFlight.NumberOfTransfers),
                    Plane_name = newFlight.PlaneName,
                    Airline = airline

                };

                await _context.Flights.AddAsync(flight);
                _context.SaveChanges();


                return flight.Id;
            }

            throw new KeyNotFoundException("Add flight is unsuccessffully. Server not found selected airline.");
        }
        #endregion

        public Task<IFlight> LoadFlight(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteFlight(string flightID)
        {
            var resultFind = await _context.Flights.FindAsync(int.Parse(flightID));
            if (resultFind != null)
            {
                _context.Flights.Remove(resultFind);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public List<IFlight> LoadAllFlights()
        {
            var flights = _context.Flights.Include(a => a.Airline);
            if (flights == null)
            {
                throw new Exception("Server not found any flight bacause the airline table is empty.");
            }

            List<IFlight> result = new List<IFlight>();
            foreach (var flight in flights)
            {
                result.Add(new FlightDataModel()
                {
                    FlightID = flight.Id,
                    StartTime = flight.Start_time.Date.ToString(),
                    EndTime = flight.End_time.Date.ToString(),
                    StartLocation = flight.Start_location,
                    EndLocation = flight.End_location,
                    FlightTime = flight.Flight_length_time.ToString(),
                    FlightLengthKM = flight.Flight_length_km.ToString(),
                    SumOfAllGrades = flight.Sum_of_all_grades,
                    AdditionalInformation = flight.Additional_information,
                    AllTransfers = flight.All_transfers,
                    LugageWeight = flight.Lugage_weight.ToString(),
                    NumberOfGrades = flight.Number_of_grades,
                    NumberOfTransfers = flight.Number_of_transfers.ToString(),
                    PlaneName = flight.Plane_name,
                    AirlineID = flight.Airline.Id + " - " + flight.Airline.Name
                });
            }

            return result;
        }

       

        public void UpdateFlight(string flightID, IFlight flight)
        {
            throw new NotImplementedException();
        }
    }
}
