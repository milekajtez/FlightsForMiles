import Modal from 'react-modal'
import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AddDestination(props) {

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

    const airlineField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const addDestinationForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za menjanje destinacije
        },
        fields: [nameField, cityField, countryField, airlineField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.addIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setAddIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>ADD NEW DESTINATION</h2>
                <form onSubmit={addDestinationForm.handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={nameField.value} required={nameField.isRequired}
                            onChange={nameField.handleChange} id="nameField"/>
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={cityField.value} required={cityField.isRequired}
                            onChange={cityField.handleChange} id="cityField"/>
                        <label>City</label>
                    </div>
                    <div className="user-box">
                        <input value={countryField.value} required={countryField.isRequired}
                            onChange={countryField.handleChange} id="countryField"/>
                        <label>Country</label>
                    </div>
                    <div type="text" className="user-box">
                        <select value={airlineField.value} required={airlineField.isRequired}
                            onChange={airlineField.handleChange} id="airlineField">
                                <option value=""></option>
                                <option value="1">Airline 1</option>
                                <option value="2">Airline 2</option>
                                <option value="3">Airline 3</option>
                        </select>
                        <label>Airline</label>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AddDestination
