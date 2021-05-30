import React from 'react'
import { useAlert } from 'react-alert'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { changeTicket, loadTickets } from '../../../../redux/avio-admin/ticket/ticketAction'

function ChangeTicket(props) {
    const dispatch = useDispatch()
    const alert = useAlert()

    const numberField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const typeField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const priceField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const isQuickBookingField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const changeTicketForm = useFormWithFields({
        onSubmit: (e) => {
            if(Validation()){
                dispatch(changeTicket({
                    ticketID: props.changeTicket.ticketID,
                    number: numberField.value,
                    type: typeField.value,
                    price: priceField.value,
                    isQuickBooking: isQuickBookingField.value,
                    flightID: props.changeTicket.flightID
                }))
                .then(response => {
                    if (response.status === 204) {
                        alert.show("Update successfully.", {
                            type: 'success'
                        })

                        changeTicketForm.handleReset()
                        props.setChangeTicket({ isOpen: !props.changeTicket.isOpen, currentFlight: props.changeTicket.ticketID })
                        dispatch(loadTickets(props.changeTicket.flightID))
                    }
                    else {
                        alert.show('Unknown error.', {
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.data.indexOf("(Updating unsuccessfully. Server not found ticket for updating.)") !== -1) {
                        alert.show("Updating unsuccessfully. Server not found ticket for updating.", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error.", {
                            type: 'error'
                        })
                    }

                    changeTicketForm.handleReset()
                })
            }

            e.preventDefault()
        },
        fields: [numberField, typeField, priceField, isQuickBookingField]
    })

    function Validation(){
        // validacija da li sam ista uneo
        if(numberField.value === "" && typeField.value === "" && priceField.value === "" &&
            isQuickBookingField.value === "")
        {
            alert.show('You must enternew dataif you want to change ticket.', {
                type: 'info'
            })

            return false
        }

        if (numberField.value !== "") {
            if (parseFloat(numberField.value) <= 0) {
                alert.show("Ticket number must be positive number", {
                    type: 'error'
                })

                return false
            }
        }

        if (priceField.value !== "") {
            if (parseFloat(priceField.value) <= 0) {
                alert.show("Ticket price must be positive number", {
                    type: 'error'
                })

                return false
            }
        }

        return true
    }

    return (
        <Modal ariaHideApp={false} isOpen={props.changeTicket.isOpen} closeTimeoutMS={500}
            className="new-member-inner-login" 
            onRequestClose={() => props.setChangeTicket({ isOpen: false, ticketID: props.changeTicket.ticketID, 
                flightID: props.changeTicket.flightID })}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>CHANGE TICKET</h2>
                <form onSubmit={changeTicketForm.handleSubmit}>
                    <div className="user-box">
                        <input type="number" value={numberField.value} required={numberField.isRequired}
                            onChange={numberField.handleChange} id="numberField" />
                        <label>Ticket number</label>
                    </div>
                    <div className="user-box">
                        <select value={typeField.value} required={typeField.isRequired}
                            onChange={typeField.handleChange} id="typeField">
                            <option value=""></option>
                            <option value="BUSINESS">BUSINESS</option>
                            <option value="FIRST">FIRST</option>
                            <option value="ECONOMIC">ECONOMIC</option>
                        </select>
                        <label>Ticket type</label>
                    </div>
                    <div className="user-box">
                        <input type="number" value={priceField.value} required={priceField.isRequired}
                            onChange={priceField.handleChange} id="priceField" />
                        <label>Ticket price</label>
                    </div>
                    <div className="user-box">
                        <select value={isQuickBookingField.value} required={isQuickBookingField.isRequired}
                            onChange={isQuickBookingField.handleChange} id="isQuickBookingField">
                            <option value=""></option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                        <label>Is quick booking?</label>
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

export default ChangeTicket
