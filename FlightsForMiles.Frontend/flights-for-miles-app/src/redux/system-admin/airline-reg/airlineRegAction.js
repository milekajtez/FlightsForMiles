import airlineService from "../../../services/AirlineService"

export const addAirline = (newAirline) => () => 
    new Promise(function(resolve, reject) {
        airlineService.addAirline(newAirline)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })