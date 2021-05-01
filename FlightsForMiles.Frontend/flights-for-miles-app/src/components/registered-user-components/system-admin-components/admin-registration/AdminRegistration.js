import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AdminRegistration() {
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
            console.log(e)
            e.preventDefault()
            //...
            registerAvioAdminForm.handleReset()
        },
        fields: [usernameField, emailField, passwordField, confirmPasswordField, pinField, telephoneField]
    })

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
