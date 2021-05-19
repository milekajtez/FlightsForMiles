import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function ChangeProfile() {
    const usernameField = useFormField({
        initialValue: ''
    })
    const emailField = useFormField({
        initialValue: ''
    })
    const phoneNumberField = useFormField({
        initialValue: ''
    })

    const firstnameField = useFormField({
        initialValue: ''
    })

    const lastNameField = useFormField({
        initialValue: ''
    })

    const addressField = useFormField({
        initialValue: ''
    })

    const passportField = useFormField({
        initialValue: ''
    })

    const changeProfileDataForm = useFormWithFields({
        onSubmit: (e) => {
            // izmena podataka korisnika
        },
        fields: [usernameField, emailField, phoneNumberField, firstnameField, lastNameField, addressField, passportField]
    })


    return (
        <div className="profile-change reg-box">
            <h4 style={{ color: "#1da1f2" }}>CHANGE PROFILE DATA</h4>
            <br></br>
            <form onSubmit={changeProfileDataForm.handleSubmit}>
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={usernameField.value} onChange={usernameField.handleChange} 
                    id="usernameField" placeholder="Username" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="email" value={emailField.value} onChange={emailField.handleChange} 
                    id="emailField" placeholder="Email" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="number" value={phoneNumberField.value} onChange={phoneNumberField.handleChange} 
                    id="phoneNumberField" placeholder="Phone number" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={firstnameField.value} onChange={firstnameField.handleChange} 
                    id="firstnameField" placeholder="First name" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={lastNameField.value} onChange={lastNameField.handleChange} 
                    id="lastNameField" placeholder="Last name" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="text" value={addressField.value} onChange={addressField.handleChange} 
                    id="addressField" placeholder="Address" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="number" value={passportField.value} onChange={passportField.handleChange} 
                    id="passportField" placeholder="Passport" />
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
