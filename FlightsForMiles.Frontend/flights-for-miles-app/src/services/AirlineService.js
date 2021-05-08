import API from './api'

const airlineService = {
    addAirline: (newAirline) => {
        var body = {
            Name: newAirline.name,
            HouseNumber: newAirline.houseNumber,
            Street: newAirline.street,
            City: newAirline.city,
            Description: newAirline.description,
            Pricelist: newAirline.pricelist
        }
        
        return API.post("Airlines", body)
    }
}

export default airlineService;