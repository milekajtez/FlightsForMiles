import React from 'react'
import { useAlert } from 'react-alert'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { changePasswordFirstLogin } from '../../../../redux/start-page/login/loginAction'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

function ChangePass() {
    const alert = useAlert();
    const dispatch = useDispatch()

    const newPassField = useFormField({
        initialValue: ''
    })
    const confirmNewPassField = useFormField({
        initialValue: ''
    })

    const changePassForm = useFormWithFields({
        onSubmit: (e) => {
            if(PasswordsVaidation()){
                var token = localStorage.getItem("User_JWT_Token")
                var decoded = jwtDecode(token)

                dispatch(changePasswordFirstLogin({
                    id: decoded.primarysid,
                    password: newPassField.value
                }))
                .then(response => {
                    if(response.status === 204){
                       alert.show("Update password successfully. Now you can login with new password.", {
                           type: 'success'
                       }) 

                       changePassForm.handleReset()
                    }
                })
                .catch(error => {
                    console.log(error)
                    alert.show("Unsuccessfully update password", {
                        type: 'error'
                    })
                })
            }
            else{
                alert.show("New password and confirm new password must have the same inputs.",{
                    type: 'error'
                })
            }

            e.preventDefault()
        },
        fields: [newPassField, confirmNewPassField]
    })


    function PasswordsVaidation(){
        if(newPassField.value.length < 8 || confirmNewPassField.value.length < 8){
            alert.show("Minimum number of caracters in password is 8!", {
                type: 'error'
            })
            return false
        }
        else{
            if(newPassField.value !== confirmNewPassField.value){
                alert.show("Please insert the same password and confirm password!", {
                    type: 'error'
                })
                return false
            }
        }

        return true
    }

    return (
        <div className="profile-change reg-box">
            <h4 style={{ color: "#1da1f2" }}>CHANGE PASSWORD</h4>
            <br></br>
            <form onSubmit={changePassForm.handleSubmit}>
                <div style={{ display: "inline-block" }}>
                    <input type="password" value={newPassField.value} onChange={newPassField.handleChange} 
                    id="newPassField" placeholder="New password"/>
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="password" value={confirmNewPassField.value} onChange={confirmNewPassField.handleChange} 
                    id="confirmNewPassField" placeholder="Confirm new password" />
                </div>
                <div>
                    <button type="submit" style={{ backgroundColor: "#141e30" }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Change password
                        </button>
                </div>
            </form>
        </div>
    )
}

export default ChangePass
