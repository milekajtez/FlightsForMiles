import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { changeProfileData, loadProfileData } from '../../../../redux/avio-admin/profile/profileAction'

function ChangeProfile() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()

    const profile = useSelector(
        state => state.profile,
    )

    const emailField = useFormField({
        initialValue: '',
        isRequired: false
    })
    const phoneNumberField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const firstnameField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const lastNameField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const addressField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const passportField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const changeProfileDataForm = useFormWithFields({
        onSubmit: (e) => {
            if(IsProfileChanged()){
                dispatch(changeProfileData({
                    username: params.username,
                    email: emailField.value,
                    firstname: firstnameField.value,
                    lastname: lastNameField.value,
                    pin: profile.profileData.pin,
                    address: addressField.value,
                    telephone: phoneNumberField.value,
                    passport: passportField.value
                }))
                .then(response => {
                    if(response.status === 204){
                        alert.show("Update successfully.", {
                            type: 'success'
                        })
    
                        changeProfileDataForm.handleReset()

                        dispatch(loadProfileData(params.username))
                    }
                    else{
                        alert.show('Unknown error.', {
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.data.indexOf("(Updating unsuccessfully. Server not found user.)") !== -1){
                        alert.show("Updating unsuccessfully. Server not found user.", {
                            type: 'error'
                        })
                    }
                    else if(error.response.data.indexOf("(Update unsuccessfully. Alredy exsist user with entered username.)") !== -1){
                        alert.show("Update unsuccessfully. Alredy exsist user with entered username.", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error.", {
                            type: 'error'
                        })  
                    }
                })
            }
            else{
                alert.show("You didn't enter any change.", {
                    type: 'info'
                })
            } 

            e.preventDefault()
        },
        fields: [emailField, phoneNumberField, firstnameField, lastNameField, addressField, passportField]
    })

    function IsProfileChanged(){
        if(emailField.value === "" && phoneNumberField.value === "" && firstnameField.value === ""
            && lastNameField.value === "" && addressField.value === "" && passportField.value === ""){
                return false;
            }
        return true;
    }

    return (
        <div className="profile-change reg-box">
            <h4 style={{ color: "#1da1f2" }}>CHANGE PROFILE DATA</h4>
            <br></br>
            <form onSubmit={changeProfileDataForm.handleSubmit}>
                <div style={{ display: "inline-block" }}>
                    <input type="email" value={emailField.value} onChange={emailField.handleChange} 
                    required={emailField.isRequired} id="emailField" placeholder="Email" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="number" value={phoneNumberField.value} onChange={phoneNumberField.handleChange} 
                    required={phoneNumberField.isRequired} id="phoneNumberField" placeholder="Phone number" />
                </div>
                <br></br>
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={firstnameField.value} onChange={firstnameField.handleChange} 
                    required={firstnameField.isRequired} id="firstnameField" placeholder="First name" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={lastNameField.value} onChange={lastNameField.handleChange} 
                    required={lastNameField.isRequired} id="lastNameField" placeholder="Last name" />
                </div>
                <br></br>
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={addressField.value} onChange={addressField.handleChange} 
                    required={addressField.isRequired} id="addressField" placeholder="Address" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="number" value={passportField.value} onChange={passportField.handleChange} 
                    required={passportField.isRequired} id="passportField" placeholder="Passport" />
                </div>
                <div>
                    <button type="submit" style={{ backgroundColor: "#141e30" }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Change data
                        </button>
                </div>
            </form>
        </div>
    )
}

export default ChangeProfile
