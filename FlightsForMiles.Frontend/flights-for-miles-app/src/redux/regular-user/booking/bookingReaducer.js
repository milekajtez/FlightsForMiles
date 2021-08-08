import { LOAD_QUICK_BOOKING } from "./bookingTypes";

const initialState = {
    quickBookings: [],
};
  
const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_QUICK_BOOKING:
            return {
                ...state,
                quickBookings: action.payload,
            }
        default:
            return state;
    }
}

export default bookingReducer;