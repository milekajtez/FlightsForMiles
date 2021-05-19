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
    },

    avioAdminRegistration: (newAvioAdmin) => {
        var body = {
            Username: newAvioAdmin.username,
            Email: newAvioAdmin.email,
            Password: newAvioAdmin.password,
            Pin: newAvioAdmin.pin,
            Telephone: newAvioAdmin.telephone
        }
        
        return API.post("ApplicationUsers/AvioAdminRegistration", body)
    },

    changePasswordFirstLogin: (newPassObj) => {
        var body = {
            Password: newPassObj.password
        }

        return API.put(`ApplicationUsers/FirstLoginChangePass/${newPassObj.id}`, body)
    },

    loadProfileData: (username) => {
        return API.get(`ApplicationUsers/LoadUserProfileData/${username}`)
    }
}

export default loginService