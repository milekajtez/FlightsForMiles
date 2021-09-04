import { LOADING_BLOCKCHAIN } from "./bitcoinMiningTypes";

const initialState = {
    allBlocks: [],
};
  
const bitcoinMiningReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_BLOCKCHAIN:
            return {
                ...state,
                allBlocks: action.payload
            };
        default:
            return state;
    }
};

export default bitcoinMiningReducer;