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
    },

    loadAirlines: () => {
        return API.get(`Airlines`)
    },

    changeAirline: (changedAirline) => {
        var body = {
            Name: changedAirline.name,
            HouseNumber: changedAirline.houseNumber,
            Street: changedAirline.street,
            City: changedAirline.city,
            Description: changedAirline.description,
            Pricelist: changedAirline.pricelist
        }

        return API.put(`Airlines/${changedAirline.airlineID}`, body)
    }
}

export default airlineService;