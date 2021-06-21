import { AIRLINES_LOADING } from "./airlineRegTypes";

const initialState = {
  allAirlines: [],
};

const airlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case AIRLINES_LOADING:
      return {
        ...state,
        allAirlines: action.payload,
      };
    default:
      return state;
  }
};

export default airlineReducer;
