import API from './api'

const helpService = {
    loadAppDescription: () => {
        return API.get(`Helps`)
    },

    changeAppDescription: (newAppDescription) => {
        var body = {
            Description: newAppDescription
        }
        
        return API.put(`Helps`, body)
    },

    loadQuestions: () => {
        return API.get(`Helps/LoadQuestions`)
    },

    deleteQuestion: (questionID) => {
        return API.delete(`Helps/${questionID}`)
    },

    changeQuestion: (changedQuestion) => {
        var body = {
            QuestionID: changedQuestion.questionID,
            QuestionText: changedQuestion.questionText,
            Answer: changedQuestion.answer,
        }
        
        return API.put(`Helps/UpdateQuestion`, body)
    }
}

export default helpService