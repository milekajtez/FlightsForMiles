import { LOAD_ACTIVE_BOOKING, LOAD_PREVIOUS_BOOKING, LOAD_QUICK_BOOKING } from "./bookingTypes";

const initialState = {
    quickBookings: [],
    activeBookings: [],
    previousBookings: [],
};
  
const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_QUICK_BOOKING:
            return {
                ...state,
                quickBookings: action.payload,
            }
        case LOAD_ACTIVE_BOOKING:
            return {
                ...state,
                activeBookings: action.payload,
            }
        case LOAD_PREVIOUS_BOOKING: 
            return {
                ...state,
                previousBookings: action.payload,
            }
        default:
            return state;
    }
}

export default bookingReducer;