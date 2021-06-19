import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { useAlert } from 'react-alert'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { changeAirline, loadAirlines } from '../../../../redux/system-admin/airline-reg/airlineRegAction'

function AirlineChangeInfo(props) {
    const dispatch = useDispatch()
    const alert = useAlert()

    const nameField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const houseNumberField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const streetField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const cityField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const descriptionField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const pricelistField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const changeAirlineForm = useFormWithFields({
        onSubmit: (e) => {
            if(Validation()){
                dispatch(changeAirline({
                    airlineID: props.airline.id, 
                    name: nameField.value,
                    houseNumber: houseNumberField.value,
                    street: streetField.value,
                    city: cityField.value,
                    description: descriptionField.value,
                    pricelist: pricelistField.value
                }))
                .then(response => {
                    if (response.status === 204) {
                        alert.show("Update successfully.", {
                            type: 'success'
                        })

                        changeAirlineForm.handleReset()
                        props.setChangeInfo(!props.changeInfoIsOpen)
                        dispatch(loadAirlines())
                    }
                    else {
                        alert.show('Unknown error.', {
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.data.indexOf("(Updating unsuccessfully. Server not found airline for updating.)") !== -1) {
                        alert.show("Updating unsuccessfully. Server not found airline for updating.", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error.", {
                            type: 'error'
                        })
                    }

                    changeAirlineForm.handleReset()
                })
            }

            e.preventDefault()
        },
        fields: [nameField, houseNumberField, streetField, cityField, descriptionField, pricelistField]
    })

    function Validation(){
        if(nameField.value === "" && houseNumberField.value === "" && streetField.value === "" &&
            cityField.value === "" && descriptionField.value === "" && pricelistField.value === ""){
                alert.show("You must enter new data if you want to make changes.", {
                    type: 'info'
                })

                return false
        }

        return true
    }

    return (
        <Modal ariaHideApp={false} isOpen={props.changeInfoIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setChangeInfo(!props.changeInfoIsOpen)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>CHANGE AIRLINE</h2>
                <form onSubmit={changeAirlineForm.handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={nameField.value} required={nameField.isRequired}
                            onChange={nameField.handleChange} id="nameField" placeholder={props.airline.name}/>
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="number" value={houseNumberField.value} required={houseNumberField.isRequired}
                            onChange={houseNumberField.handleChange} id="houseNumberField" placeholder={props.airline.houseNumber}/>
                        <label>House number</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={streetField.value} required={streetField.isRequired}
                            onChange={cityField.handleChange} id="streetField" placeholder={props.airline.street}/>
                        <label>Street</label>
                    </div>
                    <div className="user-box">
                        <input type="text" value={cityField.value} required={cityField.isRequired}
                            onChange={cityField.handleChange} id="cityField" placeholder={props.airline.city}/>
                        <label>City</label>
                    </div>
                    <div className="user-box">
                        <label style={{color: 'aqua'}}>Description</label><br></br>
                        <textarea type="text" value={descriptionField.value} required={descriptionField.isRequired}
                            onChange={descriptionField.handleChange} id="descriptionField" 
                            placeholder={props.airline.description}/>
                    </div>
                    <div className="user-box">
                        <label style={{color: 'aqua'}}>Pricelist</label><br></br>
                        <textarea type="text" value={pricelistField.value} required={pricelistField.isRequired}
                            onChange={pricelistField.handleChange} id="pricelistField" 
                            placeholder={props.airline.pricelist}/>
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

export default AirlineChangeInfo
