import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../../redux/start-page/login/loginAction'
import jwtDecode from 'jwt-decode'

function Login(props) {
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    //#region Form's field and calling redux action
    const usernameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const passwordField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const loginForm = useFormWithFields({
        onSubmit: (e) => {
            e.preventDefault()
            props.setLoginIsOpen(false)
            
            if(Validation()) {
                dispatch(login({ 
                    username: usernameField.value,
                    password: passwordField.value 
                }))
                .then(response => {
                    console.log(response)
                    if(response.status === 200){
                        localStorage.setItem("User_JWT_Token", response.data.token)
                        // u zavisnosti od toga koji tip korisnika se prijavio na sistem...ide se na odredjenu rutu
                        // ili se ide na stranicu za glavnog admina ili na stranicu za avio admina ili na stranicu
                        // za regularnog user-a
                        var token = response.data.token;
                        var decoded = jwtDecode(token)

                        
                        if(decoded.role === "regular_user"){
                            // regular user
                            history.push(`/regular/${usernameField.value}`)
                        }
                        else if(decoded.role === "main_admin"){
                            // system admin
                            history.push(`/system/${usernameField.value}`)
                        }
                        else {
                            // avio admin
                            history.push(`/avio/${usernameField.value}`)
                        }
                        
                        alert.show("Login successfully", {
                            type: 'success'
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.data.indexOf("(Username is incorrect.)") !== -1){
                        alert.show("User login unsuccesfully. Username is incorrect.", {
                            type: 'error'
                        })
                    }
                    else if(error.response.data.indexOf("(Password is incorrect.)") !== -1){
                        alert.show("User login unsuccesfully. Password is incorrect.", {
                            type: 'error'
                        })
                    }
                    else if(error.response.data.indexOf("(Please go to your mail accont and confirm you registration.)") !== -1){
                        alert.show("User login unsuccesfully. Please go to your mail accont and confirm you registration.", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error", {
                            type: 'error'
                        })
                    }
                })
            }

            loginForm.handleReset()
        },
        fields: [usernameField, passwordField]
    })
    //#endregion
    //#region Form fields validation
    function Validation(){
        // password validation
        if(passwordField.value.length < 8){
            alert.show("Minimum number of caracters in password is 8!", {
                type: 'error'
            })
            return false
        }

        return true
    }
    //#endregion

    return (
        <Modal ariaHideApp={false} isOpen={props.loginIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setLoginIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}
        >
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={loginForm.handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={usernameField.value} required={usernameField.isRequired}
                            onChange={usernameField.handleChange} id="usernameField" />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="password" value={passwordField.value} required={passwordField.isRequired}
                            onChange={passwordField.handleChange} id="passwordField" />
                        <label>Password</label>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        Login
                    </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Login
