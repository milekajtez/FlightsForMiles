import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteQuestion, loadQuestions } from '../../../../redux/avio-admin/help/helpAction'
import AnswerQuestionForm from './AnswerQuestionForm'

function AllQuestions() {
    const [answerIsOpen, setAnswerIsOpen] = useState({ open: false, currentQuest: {} })

    const alert  = useAlert()
    const dispatch = useDispatch()

    const questions = useSelector(
        state => state.help
    )

    useEffect(() => {
        dispatch(loadQuestions())
    }, [dispatch])

    const deleteCurrentQuestion = (questionID) => {
        dispatch(deleteQuestion(questionID))
        .then(response => {
            if(response.status === 204){
                alert.show("Question delete successfully.", {
                    type: 'success'
                })

                dispatch(loadQuestions())
            }
            else {
                alert.show("Unknown error.", {
                    type: 'error'
                })
            }
        })
        .catch(error => {
            console.log(error);
            if(error.response.data.indexOf("(Deleting unsuccessfully. Question with sended id doesn't exsist.)") !== -1){
                alert.show("Deleting unsuccessfully. Question with sended id doesn't exsist.", {
                    type: 'error'
                })
            }
            else{
                alert.show("Unknown error", {
                    type: 'error'
                })
            }
        })
    }

    return (
        <div>
            <h3 style={{ color: "#fff", marginTop: "3%"}}>ALL QUESTIONS</h3>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Question ID</th>
                        <th>Question</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.allQuestions.map(question => {
                            return (
                                <tr key={question.questionID}>
                                    <td>{question.questionID}</td>
                                    <td>{question.questionText}</td>
                                    <td>
                                        <button className="btn btn-light" onClick= {() => setAnswerIsOpen({open: true, currentQuest: question})}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                                        <button className="btn btn-danger" onClick={() => deleteCurrentQuestion(question.questionID)}><i className="fas fa-trash-alt"></i> DELETE</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <AnswerQuestionForm answerIsOpen={answerIsOpen} setAnswerIsOpen={setAnswerIsOpen}/>
        </div>
    )
}

export default AllQuestions
