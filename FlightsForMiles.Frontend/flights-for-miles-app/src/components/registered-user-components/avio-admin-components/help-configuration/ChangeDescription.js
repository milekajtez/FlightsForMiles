import Modal from 'react-modal'
import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function ChangeDescription(props) {
    const descriptionField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const changeDescriptionForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za menjanje app description
        },
        fields: [descriptionField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.changeDescriptionIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setChangeDescriptionIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>CHANGE APP DESCRIPTION</h2>
                <form onSubmit={changeDescriptionForm.handleSubmit}>
                    <div className="user-box">
                        <h6 style={{ color: "aqua" }}>Application description</h6>
                        <textarea type="text" value={descriptionField.value} required={descriptionField.isRequired}
                            onChange={descriptionField.handleChange} id="descriptionField" rows="8" style={{width:"80%"}}/>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Change
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ChangeDescription
