import { LOADING_BLOCKCHAIN, LOADING_TRANSACTION_FOR_VALIDATION } from "./bitcoinMiningTypes";

const initialState = {
    allBlocks: [],
    transactionsForValidation: [],
};
  
const bitcoinMiningReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_BLOCKCHAIN:
            return {
                ...state,
                allBlocks: action.payload
            };
        case LOADING_TRANSACTION_FOR_VALIDATION:
            return {
                ...state,
                transactionsForValidation: action.payload
            }
        default:
            return state;
    }
};

export default bitcoinMiningReducer;