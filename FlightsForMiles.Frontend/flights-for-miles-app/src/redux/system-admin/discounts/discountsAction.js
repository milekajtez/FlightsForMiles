import discountService from "../../../services/DiscountService"
import { DISCOUNTS_LOADING } from "./discountTypes"

export const loadDiscountsAction = (discounts) => {
    debugger;
    return {
        type: DISCOUNTS_LOADING,
        payload: discounts
    }
}

export const loadDiscounts = () => {
    return (dispatch) => {
        discountService.loadDiscounts()
        .then(response => {
            if(response.status === 200){
                dispatch(loadDiscountsAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const chageDiscount = (newValue, type) => {
    return () => {
        discountService.changeDiscount(newValue, type)
        .then(response => {
            if(response.status === 204){
                console.log("Udpate successfully.")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}