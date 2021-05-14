import Modal from 'react-modal'
import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'

function AnswerQuestionForm(props) {
    const answerField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const answerForm = useFormWithFields({
        onSubmit: (e) => {
            //pocetak logike za odgovor na pitanje
            e.preventDefault()
        },
        fields: [answerField]
    })

    return (
        <Modal ariaHideApp={false} isOpen={props.answerIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setAnswerIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <div style={{ color: "#fff", marginTop: "1%", textAlign: 'center'}}>
                    <h2>ANSWER ON QUESTION</h2>
                    When application will be done?    
                </div>
                <hr style={{backgroundColor: 'aqua'}}></hr>
                <form onSubmit={answerForm.handleSubmit}>
                    <div className="user-box">
                        <h6 style={{ color: "aqua" }}>Answer:</h6>
                        <textarea type="text" value={answerField.value} required={answerField.isRequired}
                            onChange={answerField.handleChange} id="answerField" rows="8" style={{width:"80%"}}/>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Answer
                        </button>
                    </div>
                </form>
            </div>
        
        </Modal>
    )
}

export default AnswerQuestionForm
