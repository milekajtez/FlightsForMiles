import API from './api'

const helpService = {
    loadAppDescription: () => {
        return API.get(`Helps`)
    },

    changeAppDescription: (newAppDescription) => {
        var body = {
            Description: newAppDescription
        }
        
        return API.put(`Helps`, body)
    }
}

export default helpService