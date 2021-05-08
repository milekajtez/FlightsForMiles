import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { addAirline } from '../../../../redux/system-admin/airline-reg/airlineRegAction'

function AirlineRegistration() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const nameField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const houseNumberField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const streetField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const cityField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const descriptionField = useFormField({
        initialValue: '',
        isRequired: true
    })
    const pricelistField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const registerAirlineForm = useFormWithFields({
        onSubmit: (e) => {
            if(Validation()){
                dispatch(addAirline({
                    name: nameField.value,
                    houseNumber: houseNumberField.value,
                    street: streetField.value,
                    city: streetField.value,
                    description: descriptionField.value,
                    pricelist: pricelistField.value
                }))
                .then(response => {
                    if (response.status === 201) {
                        console.log(response)
                        alert.show("Airline create successfully.", {
                            type: 'success'
                        })
                        registerAirlineForm.handleReset()
                    }
                })
                .catch(error => {
                    console.error(error)
                    if(error.response.data.indexOf("Please enter a different airline name") !== -1){
                        alert.show("Adding airline unsuccessfully. Please enter a different airline name", {
                            type: 'error'
                        })
                    }
                    else {
                        alert.show("Unknown error", {
                            type: 'error'
                        })
                    }
                })
            }

            e.preventDefault()
        },
        fields: [nameField, houseNumberField, streetField, cityField, descriptionField, pricelistField]
    })

    function Validation(){
        if(isNaN(Number(houseNumberField.value)) || parseInt(houseNumberField.value) <= 0){
            alert.show("Please insert a valid phone number! (For example '0628508315')", {
                type: 'error'
            })
            return false
        }

        return true
    }

    return (
        <div className="box">
            <form onSubmit={registerAirlineForm.handleSubmit}>
                <div>
                    <br></br>
                    <input type="text" value={nameField.value} required={nameField.isRequired}
                        onChange={nameField.handleChange} id="nameField" placeholder="Name" />
                </div>
                <div>
                    <input type="number" value={houseNumberField.value} required={houseNumberField.isRequired}
                        onChange={houseNumberField.handleChange} id="houseNumberField" placeholder="House number" />
                </div>
                <div>
                    <input type="text" value={streetField.value} required={streetField.isRequired}
                        onChange={streetField.handleChange} id="streetField" placeholder="Street" />
                </div>
                <div>
                    <input type="text" value={cityField.value} required={cityField.isRequired}
                        onChange={cityField.handleChange} id="cityField" placeholder="City" />
                </div>
                <div>
                    <textarea type="text" value={descriptionField.value} required={descriptionField.isRequired}
                        onChange={descriptionField.handleChange} id="descriptionField" placeholder="Description"/>
                </div>
                <div>
                    <textarea type="text" value={pricelistField.value} required={pricelistField.isRequired}
                        onChange={pricelistField.handleChange} id="pricelistField" placeholder="Pricelist"/>
                </div>
                <div>
                    <button type="submit" style={{ backgroundColor: "#141e30" }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Register
                        </button>
                </div>
            </form>
        </div>
    )
}

export default AirlineRegistration
