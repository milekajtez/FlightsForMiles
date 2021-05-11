import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AddFlights(props) {
    const startTimeField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const endTimeField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const startLocationField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const endLocationField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const flightLengthField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const additionalInfoField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const numOfTransfersField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const allTransfersField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const planeNameField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const luggageWeightField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const airlineField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const economicSeatsField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const economicPriceField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const firstClassSeatsField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const firstClassPriceField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const businessSeatsField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const businessPriceField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const addFlightForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za dodavanje leta
        },
        fields: [startTimeField, endTimeField, startLocationField, endLocationField, flightLengthField, additionalInfoField, numOfTransfersField, allTransfersField,
            planeNameField, luggageWeightField, airlineField, economicSeatsField, economicPriceField, firstClassSeatsField, firstClassPriceField,
            businessSeatsField, businessPriceField]
    })


    return (
        <Modal ariaHideApp={false} isOpen={props.addIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setAddIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="reg-box">
                <h2>ADD NEW FLIGHT</h2>
                <form onSubmit={addFlightForm.handleSubmit}>
                    <div>
                        <span className="user-box">
                            <input type="text" value={startTimeField.value} required={startTimeField.isRequired}
                                onChange={startTimeField.handleChange} id="startTimeField" />
                            <label>Start time</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={startTimeField.value} required={startTimeField.isRequired}
                                onChange={startTimeField.handleChange} id="startTimeField" />
                            <label>End time</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="text" value={startLocationField.value} required={startLocationField.isRequired}
                                onChange={startLocationField.handleChange} id="startLocationField" />
                            <label>Start location</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={endLocationField.value} required={endLocationField.isRequired}
                                onChange={endLocationField.handleChange} id="endLocationField" />
                            <label>End location</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={flightLengthField.value} required={flightLengthField.isRequired}
                                onChange={flightLengthField.handleChange} id="flightLengthField" />
                            <label>Flight length (km)</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={numOfTransfersField.value} required={numOfTransfersField.isRequired}
                                onChange={numOfTransfersField.handleChange} id="numOfTransfersField" />
                            <label>Number of transfers</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="text" value={allTransfersField.value} required={allTransfersField.isRequired}
                                onChange={allTransfersField.handleChange} id="allTransfersField" />
                            <label>All transfers (for example: Belgrade-Budapest-Berlin)</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={planeNameField.value} required={planeNameField.isRequired}
                                onChange={planeNameField.handleChange} id="planeNameField" />
                            <label>Plane name</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={luggageWeightField.value} required={luggageWeightField.isRequired}
                                onChange={luggageWeightField.handleChange} id="luggageWeightField" />
                            <label>Lugage weight</label>
                        </span>
                        <span className="user-box">
                            <select value={airlineField.value} required={airlineField.isRequired}
                                onChange={airlineField.handleChange} id="airlineField">
                                <option value=""></option>
                                <option value="1">Airline 1</option>
                                <option value="2">Airline 2</option>
                                <option value="3">Airline 3</option>
                            </select>
                            <label>Airline</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={economicSeatsField.value} required={economicSeatsField.isRequired}
                                onChange={economicSeatsField.handleChange} id="economicSeatsField" />
                            <label>Number of economic class seats</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={economicPriceField.value} required={economicPriceField.isRequired}
                                onChange={economicPriceField.handleChange} id="economicPriceField" />
                            <label>Price of economic class seat (&euro;)</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={firstClassSeatsField.value} required={firstClassSeatsField.isRequired}
                                onChange={firstClassSeatsField.handleChange} id="firstClassSeatsField" />
                            <label>Number of first class seats</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={firstClassPriceField.value} required={firstClassPriceField.isRequired}
                                onChange={firstClassPriceField.handleChange} id="firstClassPriceField" />
                            <label>Price of first class seat (&euro;)</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={businessSeatsField.value} required={businessSeatsField.isRequired}
                                onChange={businessSeatsField.handleChange} id="businessSeatsField" />
                            <label>Number of business class seats</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={businessPriceField.value} required={businessPriceField.isRequired}
                                onChange={businessPriceField.handleChange} id="businessPriceField" />
                            <label>Price of business class seat (&euro;)</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <h6 style={{ color: "aqua" }}>Additional info</h6>
                            <textarea type="text" value={additionalInfoField.value} required={additionalInfoField.isRequired}
                                onChange={additionalInfoField.handleChange} id="additionalInfoField" rows="4" cols="50" />
                        </span>
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

export default AddFlights
