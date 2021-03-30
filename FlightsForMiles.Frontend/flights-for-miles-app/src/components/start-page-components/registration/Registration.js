import React from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { userRegistration } from '../../../redux/start-page/registration/registrationAction'

function Registration(props) {
    const dispatch = useDispatch()

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

    const firstNameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const lastNameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const pinField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const addressField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const telephoneField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const passportField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const regForm = useFormWithFields({
        onSubmit: (e) => {
            // potrebne dodatne validacije, kao sto su poredjenje password-a i confirm password-a
            // oblik i duzina svih polja...sve cega se setim
            dispatch(userRegistration({
                username: usernameField.value,
                email: emailField.value,
                password: passwordField.value,
                firstname: firstNameField.value,
                lastname: lastNameField.value,
                pin: pinField.value,
                address: addressField.value,
                telephone: telephoneField.value,
                passport: passportField.value
            }))
            
            e.preventDefault()
            props.setRegIsOpen(false)
            /*regForm.handleReset()*/
        },
        fields: [usernameField, emailField, passwordField, confirmPasswordField, firstNameField,
            lastNameField, pinField, addressField, telephoneField, passportField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.regIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setRegIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }
            }}
        >
            <div className="reg-box">
                <h2>Register</h2>
                <form onSubmit={regForm.handleSubmit}>
                    <div>
                        <span className="user-box">
                            <input type="text" value={usernameField.value} required={usernameField.isRequired}
                                onChange={usernameField.handleChange} id="usernameField" />
                            <label>Username</label>
                        </span>
                        <span className="user-box">
                            <input type="email" value={emailField.value} required={emailField.isRequired}
                                onChange={emailField.handleChange} id="emailField" />
                            <label>Email</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="password" value={passwordField.value} required={passwordField.isRequired}
                                onChange={passwordField.handleChange} id="passwordField" />
                            <label>Password</label>
                        </span>
                        <span className="user-box">
                            <input type="password" value={confirmPasswordField.value} required={confirmPasswordField.isRequired}
                                onChange={confirmPasswordField.handleChange} id="confirmPasswordField" />
                            <label>Confirm password</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="text" value={firstNameField.value} required={firstNameField.isRequired}
                                onChange={firstNameField.handleChange} id="firstNameField" />
                            <label>First name</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={lastNameField.value} required={lastNameField.isRequired}
                                onChange={lastNameField.handleChange} id="lastNameField" />
                            <label>Last name</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={pinField.value} required={pinField.isRequired}
                                onChange={pinField.handleChange} id="pinField" />
                            <label>Personal identity number</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={addressField.value} required={addressField.isRequired}
                                onChange={addressField.handleChange} id="addressField" />
                            <label>Address</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={telephoneField.value} required={telephoneField.isRequired}
                                onChange={telephoneField.handleChange} id="telephoneField" />
                            <label>Telephone number</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={passportField.value} required={passportField.isRequired}
                                onChange={passportField.handleChange} id="passportField" />
                            <label>Passport number</label>
                        </span>
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
        </Modal>
    )
}

export default Registration
