import React from 'react'
import Modal from 'react-modal'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AddTicket(props) {
    const numberField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const typeField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const priceField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const isQuickBookingField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const addTicketForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za dodavanje leta
        },
        fields: [numberField, typeField, priceField, isQuickBookingField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.addTicket} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setAddTicket(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>ADD NEW TICKET</h2>
                <form onSubmit={addTicketForm.handleSubmit}>
                    <div className="user-box">
                        <input type="number" value={numberField.value} required={numberField.isRequired}
                            onChange={numberField.handleChange} id="numberField" />
                        <label>Ticket number</label>
                    </div>
                    <div className="user-box">
                        <select value={typeField.value} required={typeField.isRequired}
                            onChange={typeField.handleChange} id="typeField">
                            <option value=""></option>
                            <option value="1">BUSINESS</option>
                            <option value="2">FIRTS</option>
                            <option value="3">ECONOMIC</option>
                        </select>
                        <label>Ticket type</label>
                    </div>
                    <div className="user-box">
                        <input type="number" value={priceField.value} required={priceField.isRequired}
                            onChange={priceField.handleChange} id="priceField" />
                        <label>Ticket price</label>
                    </div>
                    <div className="user-box">
                        <input type="checkbox" value={isQuickBookingField.value} required={isQuickBookingField.isRequired}
                            onChange={isQuickBookingField.handleChange} id="isQuickBookingField" />
                        <label>Is quick booking?</label>
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

export default AddTicket
