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
    },

    loginViaGoogle: (user) => {
        console.log(user)
        var body = {
            IdToken: user.tokenId
        }

        return API.post(`ApplicationUsers/UserGoogleLogin`, body)
    }
}

export default loginService