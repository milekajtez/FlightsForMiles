import React from 'react'
import DiscountForm from './DiscountForm'

function FormQuick() {
    return (
        <span className="box" style={{float:"left", marginLeft:"0.75%"}}>
            <DiscountForm discountType={"quick"}/>
        </span>
    )
}

export default FormQuick
