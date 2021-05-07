import discountService from "../../../services/DiscountService"
import { DISCOUNTS_LOADING } from "./discountTypes"

export const loadDiscountsAction = (discounts) => {
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

export const chageDiscount = (newValue, type) => () => 
    new Promise(function(resolve, reject){
        discountService.changeDiscount(newValue, type)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })