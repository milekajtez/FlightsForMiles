import helpService from "../../../services/HelpService"
import { DESCRIPTION_LOADING, QUESTIONS_LOADING } from "./helpTypes"

export const loadAppDescriptionAction = (appDescription) => {
    return {
        type: DESCRIPTION_LOADING,
        payload: appDescription
    }
}    

export const loadAppDescription = () => {
    return (dispatch) => {
        helpService.loadAppDescription()
        .then(response => {
            if(response.status === 200){
                dispatch(loadAppDescriptionAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const changeAppDescription = (newAppDescription) => () => 
    new Promise(function(resolve, reject){
        helpService.changeAppDescription(newAppDescription)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const loadQuestionsAction = (allQuestions) => {
    return {
        type: QUESTIONS_LOADING,
        payload: allQuestions
    }
}    
    
export const loadQuestions = () => {
    return (dispatch) => {
        helpService.loadQuestions()
        .then(response => {
            if(response.status === 200){
                dispatch(loadQuestionsAction(response.data))
            }
        })  
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteQuestion = (questionID) => () => 
    new Promise(function(resolve, reject){
        helpService.deleteQuestion(questionID)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })

export const changeQuestion = (changedQuestion) => () => 
    new Promise(function(resolve, reject){
        helpService.changeQuestion(changedQuestion)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })


export const askQuestion = (question) => () => 
    new Promise(function(resolve, reject) {
        helpService.askQuestion(question)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })