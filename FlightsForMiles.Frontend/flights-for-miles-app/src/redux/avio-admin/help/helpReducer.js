import { DESCRIPTION_LOADING, QUESTIONS_LOADING } from "./helpTypes"

const initialState =  {
    appDescription: {},
    allQuestions: []
}

const helpReducer = (state = initialState, action) => {
    switch(action.type){
        case DESCRIPTION_LOADING:
            return {
                ...state,
                appDescription: action.payload
            }
        case QUESTIONS_LOADING:
            return {
                ...state,
                allQuestions: action.payload
            }
        default:
            return state
    }
}

export default helpReducer