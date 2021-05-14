import React, { useState } from 'react'
import AnswerQuestionForm from './AnswerQuestionForm'

function AllQuestions() {
    const [answerIsOpen, setAnswerIsOpen] = useState(false)
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
                    <tr>
                        <td>1</td>
                        <td>Name 1</td>
                        <td>
                            <button className="btn btn-light" onClick= {() => setAnswerIsOpen(true)}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                            <button className="btn btn-danger"><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Name 2</td>
                        <td>
                            <button className="btn btn-light" onClick= {() => setAnswerIsOpen(true)}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                            <button className="btn btn-danger"><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Name 3</td>
                        <td>
                            <button className="btn btn-light" onClick= {() => setAnswerIsOpen(true)}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                            <button className="btn btn-danger"><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Name 4</td>
                        <td>
                            <button className="btn btn-light" onClick= {() => setAnswerIsOpen(true)}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                            <button className="btn btn-danger"><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Name 5</td>
                        <td>
                            <button className="btn btn-light" onClick= {() => setAnswerIsOpen(true)}><i className="fas fa-reply"></i> ANSWER</button>&nbsp;
                            <button className="btn btn-danger"><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <AnswerQuestionForm answerIsOpen={answerIsOpen} setAnswerIsOpen={setAnswerIsOpen}/>
        </div>
    )
}

export default AllQuestions
