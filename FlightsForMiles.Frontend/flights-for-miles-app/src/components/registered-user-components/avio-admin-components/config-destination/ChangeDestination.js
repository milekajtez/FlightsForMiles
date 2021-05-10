import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function ChangeDestination(props) {

    const nameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const cityField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const countryField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const changeDestinationForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za dodavanje nove destinacije
        },
        fields: [nameField, cityField, countryField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.changeIsOpen} closeTimeoutMS={500}
        className="new-member-inner-login" onRequestClose={() => props.setChangeIsOpen(false)}
        style={{
            overlay: {
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
            }
        }}>
            <div className="login-box">
                <h2>CHANGE DESTINATION</h2>
                <form onSubmit={changeDestinationForm.handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={nameField.value} required={nameField.isRequired}
                            onChange={nameField.handleChange} id="nameField" />
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={cityField.value} required={cityField.isRequired}
                            onChange={cityField.handleChange} id="cityField" />
                        <label>City</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={countryField.value} required={countryField.isRequired}
                            onChange={countryField.handleChange} id="countryField" />
                        <label>Country</label>
                    </div>
                    <div className="user-box">
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

export default ChangeDestination
