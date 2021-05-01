import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AirlineRegistration() {
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
            console.log(e)
            e.preventDefault()
            //...
            registerAirlineForm.handleReset()
        },
        fields: [nameField, houseNumberField, streetField, cityField, descriptionField, pricelistField]
    })

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
