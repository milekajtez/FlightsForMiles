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
        #region 2 - Method for load one flight
        public async Task<IFlight> LoadFlight(int id)
        {
            var resultFind = await _context.Flights.FindAsync(id);
            if (resultFind != null)
            {
                IFlight flight = new FlightDataModel()
                {
                    FlightID = resultFind.Id,
                    StartTime = resultFind.Start_time.ToString(),
                    EndTime = resultFind.End_time.ToString(),
                    StartLocation = resultFind.Start_location,
                    EndLocation = resultFind.End_location,
                    FlightTime = resultFind.Flight_length_time.ToString(),
                    FlightLengthKM = resultFind.Flight_length_km.ToString(),
                    SumOfAllGrades = resultFind.Sum_of_all_grades,
                    AdditionalInformation = resultFind.Additional_information,
                    AllTransfers = resultFind.All_transfers,
                    LugageWeight = resultFind.Lugage_weight.ToString(),
                    NumberOfGrades = resultFind.Number_of_grades,
                    NumberOfTransfers = resultFind.Number_of_transfers.ToString(),
                    PlaneName = resultFind.Plane_name,
                    AirlineID = resultFind.Airline.Id.ToString()
                };

                return flight;
            }

            throw new NotImplementedException("Flight with this id (" + id + ") doesn't exsist.");
        }
        #endregion
        #region 3 - Method for delete flight
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
        #endregion
        #region 4 - Method for load all flights
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
                    StartTime = flight.Start_time.ToString(),
                    EndTime = flight.End_time.ToString(),
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
        #endregion
        #region 5 - Method for update flight
        public void UpdateFlight(string flightID, IFlight flight)
        {
            var resultFind = _context.Flights.Find(int.Parse(flightID));
            if (resultFind != null)
            {
                resultFind.Start_time = flight.StartTime.Trim() != "" ? DateTime.Parse(flight.StartTime) : resultFind.Start_time;
                resultFind.End_time = flight.EndTime.Trim() != "" ? DateTime.Parse(flight.EndTime) : resultFind.End_time;
                resultFind.Start_location = flight.StartLocation != "" ? flight.StartLocation : resultFind.Start_location;
                resultFind.End_location = flight.EndLocation != "" ? flight.EndLocation : resultFind.End_location;
                resultFind.Flight_length_time = flight.FlightTime != "" ? double.Parse(flight.FlightTime) : resultFind.Flight_length_time;
                resultFind.Flight_length_km = flight.FlightLengthKM != "" ? double.Parse(flight.FlightLengthKM) : resultFind.Flight_length_km;
                resultFind.Number_of_transfers = flight.NumberOfTransfers != "" ? uint.Parse(flight.NumberOfTransfers) : resultFind.Number_of_transfers;
                resultFind.All_transfers = flight.AllTransfers != "" ? flight.AllTransfers : resultFind.All_transfers;
                resultFind.Plane_name = flight.PlaneName != "" ? flight.PlaneName : resultFind.Plane_name;
                resultFind.Lugage_weight = flight.LugageWeight != "" ? double.Parse(flight.LugageWeight) : resultFind.Lugage_weight;
                resultFind.Additional_information = flight.AdditionalInformation != "" ? flight.AdditionalInformation : resultFind.Additional_information;

                _context.Flights.Update(resultFind);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException("Updating unsuccessfully. Server not found flight for updating.");
            }
        }
        #endregion
        #region 6 - Method for load airline's flights
        public List<IFlight> LoadFlightsForAirline(string airlineID)
        {
            var flights = _context.Flights.Include(a => a.Airline);
            if (flights == null)
            {
                throw new Exception("Serve not found any flights.");
            }

            List<IFlight> result = new List<IFlight>();
            foreach (var fly in flights) 
            {
                if (fly.Airline.Id.ToString().Equals(airlineID))
                {
                    result.Add(new FlightDataModel()
                    {
                        FlightID = fly.Id,
                        StartTime = fly.Start_time.ToString(),
                        EndTime = fly.End_time.ToString(),
                        StartLocation = fly.Start_location,
                        EndLocation = fly.End_location,
                        FlightTime = fly.Flight_length_time.ToString(),
                        FlightLengthKM = fly.Flight_length_km.ToString(),
                        SumOfAllGrades = fly.Sum_of_all_grades,
                        NumberOfGrades = fly.Number_of_grades,
                        AdditionalInformation = fly.Additional_information,
                        NumberOfTransfers = fly.Number_of_transfers.ToString(),
                        AllTransfers = fly.All_transfers,
                        PlaneName = fly.Plane_name,
                        LugageWeight = fly.Lugage_weight.ToString(),
                        AirlineID = airlineID
                    });
                }
            }

            return result;
        }
        #endregion
    }
}
