import { DISCOUNTS_LOADING } from "./discountTypes";

const initialState = {
  discQuick: 0,
  disc300: 0,
  disc600: 0,
  disc1200: 0,
};

const discountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOUNTS_LOADING:
      return {
        ...state,
        discQuick: action.payload.disc_quick,
        disc300: action.payload.disc_300,
        disc600: action.payload.disc_600,
        disc1200: action.payload.disc_1200,
      };
    default:
      return state;
  }
};

export default discountsReducer;
