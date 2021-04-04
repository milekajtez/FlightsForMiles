import API from './api'

const loginService = {
    userRegistration: (newUser) => {
        var body = {
            Username: newUser.username,
            Email: newUser.email,
            Password: newUser.password,
            Firstname: newUser.firstname,
            Lastname: newUser.lastname,
            Pin: newUser.pin,
            Address: newUser.address,
            Telephone: newUser.telephone,
            Passport: newUser.passport
        }

        return API.post("ApplicationUsers", body)
    },

    confirmRegistration: (username) => {
        return API.put(`ApplicationUsers/${username}`)
    },

    login: (user) => {
        var body = {
            Username: user.username,
            Password: user.password
        }

        return API.post(`ApplicationUsers/UserLogin`, body)
    }
}

export default loginService