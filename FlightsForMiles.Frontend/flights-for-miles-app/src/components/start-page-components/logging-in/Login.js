import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function Login(props) {

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
            // ovde ce se nastaviti citav proces.. validacija na frontu + sve ostalo
            e.preventDefault()
            props.setLoginIsOpen(false)
            loginForm.handleReset()
        },
        fields: [usernameField, passwordField]
    })


    return (
        <Modal ariaHideApp={false} isOpen={props.loginIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setLoginIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
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
