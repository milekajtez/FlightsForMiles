import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { addFriend } from '../../../../../redux/regular-user/friendship/friendshipAction';
import { useParams } from 'react-router'

function NewFriendForm(props) {
    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()

    const usernameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const newFriendForm = useFormWithFields({
        onSubmit: (e) => {
            dispatch(addFriend(params.username, usernameField.value))
            .then(response => {
                if(response.status === 201){
                    alert.show("Send friendship request successfully.", {
                        type: 'success'
                    })

                    console.log(response)

                    newFriendForm.handleReset()
                    props.newFriendIsOpen(false)
                }
                else {
                    alert.show("Unknown error.", {
                        type: 'error'
                    })
                }
            })
            .catch(error => {
                console.log(error)
                if(error.response.data.indexOf("(Sender of request doesn't exsist in database.)") !== -1){
                    alert.show("(Sender of request doesn't exsist in database.)", {
                        type: 'error'
                    })
                }
                else if(error.response.data.indexOf("(Receiver of request doesn't exsist in database.)") !== -1){
                    alert.show("Receiver of request doesn't exsist in database.", {
                        type: 'error'
                    })
                }
                else if(error.response.data.indexOf("(Receiver of request is not regular user.)") !== -1){
                    alert.show("Receiver of request is not regular user.", {
                        type: 'error'
                    })
                }
                else if(error.response.data.indexOf("(You have this friendship request or you are already friend with user with entered username.)") !== -1){
                    alert.show("You have this friendship request or you are already friend with user with entered username.", {
                        type: 'error'
                    })
                }
                else if(error.response.data.indexOf("(You can't send request yourself.)") !== -1){
                    alert.show("You can't send request yourself.", {
                        type: 'error'
                    })
                }
                else {
                    alert.show("Unknown error", {
                        type: 'error'
                    })
                }
            })

            e.preventDefault()
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
