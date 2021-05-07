import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { avioAdminRegistration } from '../../../../redux/system-admin/admin-reg/adminRegAction'

function AdminRegistration() {
    const dispatch = useDispatch()
    const alert = useAlert();

    const usernameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const emailField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const passwordField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const confirmPasswordField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const pinField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const telephoneField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const registerAvioAdminForm = useFormWithFields({
        onSubmit: (e) => {
            if(Validation()){
                dispatch(avioAdminRegistration({
                    username: usernameField.value,
                    email: emailField.value,
                    password: passwordField.value,
                    pin: pinField.value,
                    telephone: telephoneField.value,
                }))
                .then(response => {
                    if (response.status === 201) {
                        alert.show("Avio admin registration successfully.", {
                            type: 'success'
                        })
                        registerAvioAdminForm.handleReset()
                    }
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.data.indexOf("Entered username has been reserved already.") !== -1) {
                        alert.show("Registration unsuccesfully. Entered username has been reserved already.", {
                            type: 'error'
                        })
                    }
                    else if (error.response.data.indexOf("Please enter a different personal identify number.") !== -1) {
                        alert.show("Registration unsuccesfully. Please enter a different personal identify number.", {
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

            e.preventDefault()
        },
        fields: [usernameField, emailField, passwordField, confirmPasswordField, pinField, telephoneField]
    })

    function Validation(){
        if(passwordField.value.length < 8 || confirmPasswordField.value.length < 8){
            alert.show("Minimum number of caracters in password is 8!", {
                type: 'error'
            })
            return false
        }
        else{
            if(passwordField.value !== confirmPasswordField.value){
                alert.show("Please insert the same password and confirm password!", {
                    type: 'error'
                })
                return false
            }
        }

        // PIN validation
        if(isNaN(Number(pinField.value)) || pinField.value.length !== 13){
            alert.show("Please insert a valid Personal identity number! This number must to have 13 digits! (For example '3006997800000')", {
                type: 'error'
            })
            return false
        }

        // telephone validation
        if(isNaN(Number(telephoneField.value))){
            alert.show("Please insert a valid phone number! (For example '0628508315')", {
                type: 'error'
            })
            return false
        }

        return true
    }

    return (
        <div className="box">
            <form onSubmit={registerAvioAdminForm.handleSubmit}>
                <div>
                    <br></br>
                    <input type="text" value={usernameField.value} required={usernameField.isRequired}
                        onChange={usernameField.handleChange} id="usernameField" placeholder="Username" />
                </div>
                <div>
                    <input type="email" value={emailField.value} required={emailField.isRequired}
                        onChange={emailField.handleChange} id="emailField" placeholder="Email" />
                </div>
                <div>
                    <input type="password" value={passwordField.value} required={passwordField.isRequired}
                        onChange={passwordField.handleChange} id="passwordField" placeholder="Password" />
                </div>
                <div>
                    <input type="password" value={confirmPasswordField.value} required={confirmPasswordField.isRequired}
                        onChange={confirmPasswordField.handleChange} id="confirmPasswordField" placeholder="Confirm password" />
                </div>
                <div>
                    <input type="text" value={pinField.value} required={pinField.isRequired}
                        onChange={pinField.handleChange} id="pinField" placeholder="Personal indentify number" />
                </div>
                <div>
                    <input type="text" value={telephoneField.value} required={telephoneField.isRequired}
                        onChange={telephoneField.handleChange} id="telephoneField" placeholder="Telephone number" />
                </div>
                <div>
                    <button type="submit" style={{ backgroundColor: "#141e30" }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Register
                        </button>
                </div>
            </form>
        </div>
    )
}

export default AdminRegistration
