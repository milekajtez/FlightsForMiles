import React from 'react'
import DiscountForm from './DiscountForm'

function Form300() {
    return (
        <div style={{display: "inline-block"}}>
            <span className="box">
                <DiscountForm  discountType={"300"}/>
            </span>
        </div>
    )
}

export default Form300
