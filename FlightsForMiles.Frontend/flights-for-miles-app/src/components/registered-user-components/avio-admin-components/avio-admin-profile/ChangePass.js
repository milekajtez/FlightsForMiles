import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function ChangePass() {
    const currentPassField = useFormField({
        initialValue: ''
    })
    const newPassField = useFormField({
        initialValue: ''
    })
    const confirmNewPassField = useFormField({
        initialValue: ''
    })

    const changePassForm = useFormWithFields({
        onSubmit: (e) => {
            // izmena sifre korisnika
        },
        fields: [currentPassField, newPassField, confirmNewPassField]
    })
    return (
        <div className="profile-change reg-box">
            <h4 style={{ color: "#1da1f2" }}>CHANGE PASSWORD</h4>
            <br></br>
            <form onSubmit={changePassForm.handleSubmit}>
                <div style={{ display: "inline-block" }}>
                    <input type="password" value={currentPassField.value} onChange={currentPassField.handleChange} id="currentPassField" 
                        placeholder="Current password" />
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="password" value={newPassField.value} onChange={newPassField.handleChange} id="newPassField" placeholder="New password"/>
                </div>
                &emsp;
                <div style={{ display: "inline-block" }}>
                    <input type="password" value={confirmNewPassField.value} onChange={confirmNewPassField.handleChange} id="confirmNewPassField" 
                        placeholder="Confirm new password" />
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
