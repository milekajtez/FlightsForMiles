import React from 'react'
import { useState } from 'react'
import AskQuestion from '../start-page-components/help/AskQuestionForm'

const qeustmark = ['../assets/images/question-mark.gif']

function QuestionMark() {
    const [askQuestionIsOpen, setAskQuestion] = useState(false)
    return (
        <span title="Click if you have some question for us...">
            <img src={qeustmark[0]} alt="Qeustion Mark" style={{ height: "100px", width: "100px", float: "right" }} onClick={() => setAskQuestion(true)}></img>
            <AskQuestion askQuestionIsOpen={askQuestionIsOpen} setAskQuestion={setAskQuestion}/>
        </span>
    )
}

export default QuestionMark
