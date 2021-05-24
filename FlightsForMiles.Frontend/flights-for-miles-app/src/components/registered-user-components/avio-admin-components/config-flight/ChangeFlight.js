import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function ChangeFlight(props) {
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
    const flightTimeField = useFormField({
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

    const changeFlightForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za izmenu leta
        },
        fields: [startTimeField, endTimeField, startLocationField, endLocationField, flightLengthField, flightTimeField,
            additionalInfoField, numOfTransfersField, allTransfersField, planeNameField, luggageWeightField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.changeIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setChangeIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="reg-box">
                <h2>CHANGE FLIGHT</h2>
                <form onSubmit={changeFlightForm.handleSubmit}>
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
                            <input type="number" value={flightTimeField.value} required={flightTimeField.isRequired}
                                onChange={flightTimeField.handleChange} id="flightTimeField" />
                            <label>Flight time (hours)</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={flightLengthField.value} required={flightLengthField.isRequired}
                                onChange={flightLengthField.handleChange} id="flightLengthField" />
                            <label>Flight length (km)</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="number" value={numOfTransfersField.value} required={numOfTransfersField.isRequired}
                                onChange={numOfTransfersField.handleChange} id="numOfTransfersField" />
                            <label>Number of transfers</label>
                        </span>
                        <span className="user-box">
                            <input type="text" value={allTransfersField.value} required={allTransfersField.isRequired}
                                onChange={allTransfersField.handleChange} id="allTransfersField" />
                            <label>All transfers (for example: Belgrade-Budapest-Berlin)</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="text" value={planeNameField.value} required={planeNameField.isRequired}
                                onChange={planeNameField.handleChange} id="planeNameField" />
                            <label>Plane name</label>
                        </span>
                        <span className="user-box">
                            <input type="number" value={luggageWeightField.value} required={luggageWeightField.isRequired}
                                onChange={luggageWeightField.handleChange} id="luggageWeightField" />
                            <label>Lugage weight</label>
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
                            Change
                        </button>
                    </div>
                </form>
            </div>


        </Modal>
    )
}

export default ChangeFlight
