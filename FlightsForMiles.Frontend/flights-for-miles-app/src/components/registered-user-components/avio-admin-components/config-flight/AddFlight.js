import React from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { loadAirlines } from '../../../../redux/system-admin/airline-reg/airlineRegAction'
import { addFlight, loadFlights } from '../../../../redux/avio-admin/flight/flightAction'

function AddFlights(props) {
    const dispatch = useDispatch()
    const alert = useAlert();

    const airlines = useSelector(
        state => state.airline,
    )

    useEffect(() => {
        dispatch(loadAirlines())
    })
    const startTimeField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const endTimeField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const startHourField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const endHourField = useFormField({
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
    const airlineField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const addFlightForm = useFormWithFields({
        onSubmit: (e) => {
            if (Validation()) {
                dispatch(addFlight({
                    startTime: startTimeField.value + " " + startHourField.value,
                    endTime: endTimeField.value + " " + endHourField.value,
                    startLocation: startLocationField.value,
                    endLocation: endLocationField.value,
                    flightTime: flightTimeField.value,
                    flightLength: flightLengthField.value,
                    numOfTransfers: numOfTransfersField.value,
                    allTransfers: allTransfersField.value,
                    planeName: planeNameField.value,
                    lugageWeight: luggageWeightField.value,
                    airline: airlineField.value,
                    additionalInfo: additionalInfoField.value
                }))
                .then(response => {
                    if (response.status === 201) {
                        alert.show("Adding flight successfully.", {
                            type: 'success'
                        })

                        dispatch(loadFlights())
                        addFlightForm.handleReset()
                        props.setAddIsOpen(false)
                    }
                    else {
                        alert.show("Unknown error.", {
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.data.indexOf("(Add flight is unsuccessffully. Server not found selected airline.)") !== -1) {
                        alert.show("Add flight is unsuccessffully. Server not found selected airline.", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error.", {
                            type: 'error'
                        })
                    }
                })
            }

            e.preventDefault()
        },
        fields: [startTimeField, endTimeField, startHourField, endHourField, startLocationField, endLocationField, flightLengthField,
            flightTimeField, additionalInfoField, numOfTransfersField, allTransfersField, planeNameField,
            luggageWeightField, airlineField]
    })

    function Validation() {
        var timeError = "";
        var flightTimeError = "";
        var flightLengthError = "";
        var numOfTransfersError = "";
        var lugageWeightError = "";

        var start = startTimeField.value + ' ' + startHourField.value
        var end = endTimeField.value + ' ' + endHourField.value
        var startDate = new Date(start);
        var endDate = new Date(end)

        if(startDate.getTime() === endDate.getTime() || startDate.getTime() > endDate.getTime()){
            timeError = "Start time must be older then end time. "
        }

        if (parseFloat(flightTimeField.value) <= 0) {
            flightTimeError = "Fligth time must be positive number. "
        }

        if (parseFloat(flightLengthField.value) <= 0) {
            flightLengthError = "Fligth length must be positive number. "
        }

        if (parseInt(numOfTransfersField.value) < 0) {
            numOfTransfersError = "Number of transfers can't be negative number. "
        }

        if (parseFloat(luggageWeightField.value) <= 0) {
            lugageWeightError = "Lugage weight must be positive number."
        }

        if(timeError === "" && flightTimeError === "" && flightLengthError === "" 
            && numOfTransfersError === "" && lugageWeightError === ""){
                return true
            }
        
            alert.show(timeError +  flightTimeError + flightLengthError
                 + numOfTransfersError + lugageWeightError, {
                     type: 'error'
                 })

        return false
    }

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
                            <input type="date" value={startTimeField.value} required={startTimeField.isRequired}
                                onChange={startTimeField.handleChange} id="startTimeField" ></input>
                            <label>Start date time</label>
                        </span>
                        <span className="user-box">
                            <input type="date" value={endTimeField.value} required={endTimeField.isRequired}
                                onChange={endTimeField.handleChange} id="endTimeField" />
                            <label>End date time</label>
                        </span>
                    </div>
                    <div>
                        <span className="user-box">
                            <input type="time" value={startHourField.value} required={startHourField.isRequired}
                                onChange={startHourField.handleChange} id="startHourField" ></input>
                            <label>Start hour time</label>
                        </span>
                        <span className="user-box">
                            <input type="time" value={endHourField.value} required={endHourField.isRequired}
                                onChange={endHourField.handleChange} id="endHourField" />
                            <label>End hour time</label>
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
                            <select value={airlineField.value} required={airlineField.isRequired}
                                onChange={airlineField.handleChange} id="airlineField">
                                <option value=""></option>
                                {
                                    airlines.allAirlines.map((airline) => {
                                        return <option key={airline.id} value={airline.id}>{airline.name}</option>
                                    })
                                }
                            </select>
                            <label>Airline</label>
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
