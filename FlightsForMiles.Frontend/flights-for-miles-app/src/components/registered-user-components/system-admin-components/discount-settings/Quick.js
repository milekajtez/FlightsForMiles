import React from 'react'
import DiscountForm from './DiscountForm'

function FormQuick() {
    return (
        <span className="box" style={{float:"left"}}>
            <DiscountForm discountType={"quick"}/>
        </span>
    )
}

export default FormQuick
