import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function NewFriendForm(props) {

    const usernameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const newFriendForm = useFormWithFields({
        onSubmit: (e) => {
            e.preventDefault()
            props.newFriendIsOpen(false)
        },
        fields: [usernameField]
    })


    return (
        <Modal ariaHideApp={false} isOpen={props.isOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.newFriendIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}
        >
            <div className="login-box">
                <h2>New friendship request</h2>
                <form onSubmit={newFriendForm.handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={usernameField.value} required={usernameField.isRequired}
                            onChange={usernameField.handleChange} id="usernameField" />
                        <label>Username</label>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Send new request
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default NewFriendForm
