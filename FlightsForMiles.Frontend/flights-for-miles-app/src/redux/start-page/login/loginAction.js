import userService from "../../../services/UserService"

export const login = (user) => () => 
    new Promise(function(resolve, reject) {
        userService.login(user)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loginViaGoogle = (user) => () => 
    new Promise(function(resolve, reject) {
        userService.loginViaGoogle(user)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

