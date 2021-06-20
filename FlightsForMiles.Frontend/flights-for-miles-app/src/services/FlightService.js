import API from './api'

const flightService = {
    addFlight: (newFlight) => {
        var body = {
            StartTime: newFlight.startTime,
            EndTime: newFlight.endTime,
            StartLocation: newFlight.startLocation,
            EndLocation: newFlight.endLocation,
            FlightTime: newFlight.flightTime,
            FlightLength: newFlight.flightLength,
            NumOfTransfers: newFlight.numOfTransfers,
            AllTransfers: newFlight.allTransfers,
            PlaneName: newFlight.planeName,
            LugageWeight: newFlight.lugageWeight,
            Airline: newFlight.airline,
            AdditionalInfo: newFlight.additionalInfo
        }
        
        return API.post(`Flights`, body)
    },

    loadFlights: () => {
        return API.get(`Flights`)
    },

    deleteFlight: (flightID) => {
        return API.delete(`Flights/${flightID}`)
    },

    changeFlight: (changedFlight) => {
        var body = {
            StartTime: changedFlight.startTime,
            EndTime: changedFlight.endTime,
            StartLocation: changedFlight.startLocation,
            EndLocation: changedFlight.endLocation,
            FlightTime: changedFlight.flightTime,
            FlightLength: changedFlight.flightLength,
            NumOfTransfers: changedFlight.numOfTransfers,
            AllTransfers: changedFlight.allTransfers,
            PlaneName: changedFlight.planeName,
            LugageWeight: changedFlight.lugageWeight,
            Airline: changedFlight.airline,
            AdditionalInfo: changedFlight.additionalInfo
        }
        
        return API.put(`Flights/${changedFlight.flightID}`, body)
    },

    loadFlightsForAirline: (airlineID) => {
        return API.get(`Flights/LoadFlightsForAirline/${airlineID}`)
    }
}

export default flightService