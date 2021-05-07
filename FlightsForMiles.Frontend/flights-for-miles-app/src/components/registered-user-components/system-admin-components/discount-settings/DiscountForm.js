import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { chageDiscount, loadDiscounts } from '../../../../redux/system-admin/discounts/discountsAction'

function DiscountForm(props) {
    const dispatch = useDispatch()

    const discountField = useFormField({
        initialValue: '',
        isRequired: true
    })

    const discountForm = useFormWithFields({
        onSubmit: (e) => {
            dispatch(chageDiscount(discountField.value, props.discountType))
            console.log("1111")
            dispatch(loadDiscounts())
            console.log("2222")
            e.preventDefault()
            discountForm.handleReset()
        },
        fields: [discountField]
    })

    return (
        <>
            <br></br>
            <br></br>
            {
                props.discountType === "quick" ? <label>Change 'quick reservation' discount</label> :
                props.discountType === "300" ? <label>Change '300 - 600 points' discount</label> :
                props.discountType === "600" ? <label>Change '600 - 1200 points' discount</label> :
                <label>Change '&lt; 1200 points' discount</label>
            }
            <form onSubmit={discountForm.handleSubmit}>
                <select value={discountField.value} required={discountField.isRequired}
                    onChange={discountField.handleChange} id="discountField">
                    <option value=""> -- select an option --</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="35">35%</option>
                    <option value="40">40%</option>
                    <option value="45">45%</option>
                    <option value="50">50%</option>
                </select>
                <button type="submit" style={{ backgroundColor: "#141e30" }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Change
                </button>
            </form>
        </>
    )
}

export default DiscountForm
