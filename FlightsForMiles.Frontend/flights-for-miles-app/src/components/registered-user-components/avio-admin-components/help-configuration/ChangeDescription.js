import Modal from 'react-modal'
import React from 'react'
import { useFormField, useFormWithFields } from 'react-use-form-hooks'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { changeAppDescription, loadAppDescription } from '../../../../redux/avio-admin/help/helpAction'

function ChangeDescription(props) {
    const alert = useAlert()
    const dispatch = useDispatch()

    const descriptionField = useFormField({
        initialValue: '',
        isRequired: false
    })

    const changeDescriptionForm = useFormWithFields({
        onSubmit: (e) => {
            if(Validation()){
                dispatch(changeAppDescription(descriptionField.value))
                .then(response => {
                    if(response.status === 204){
                        alert.show("Updating application description successfully.", {
                            type: 'success'
                        })

                        changeDescriptionForm.handleReset()
                        props.setChangeDescriptionIsOpen(false)

                        dispatch(loadAppDescription())
                    }
                    else{
                        alert.show("Unknown error", {
                            type: 'error'
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.data.indexOf("(Update unsuccessfully. Server not found any pplication description.)") !== -1){
                        alert.show("Update unsuccessfully. Server not found any pplication description.", {
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
            else{
                alert.show("You must enter some information if you want to change application description.", {
                    type: 'info'
                })
            }
            
            e.preventDefault()
        },
        fields: [descriptionField]
    })

    function Validation(){
        if(descriptionField.value === ""){
            return false
        }

        return true
    }
    return (
        <Modal ariaHideApp={false} isOpen={props.changeDescriptionIsOpen} closeTimeoutMS={500}
            className="new-member-inner-login" onRequestClose={() => props.setChangeDescriptionIsOpen(false)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box">
                <h2>CHANGE APP DESCRIPTION</h2>
                <form onSubmit={changeDescriptionForm.handleSubmit}>
                    <div className="user-box">
                        <h6 style={{ color: "aqua" }}>Application description</h6>
                        <textarea type="text" value={descriptionField.value} required={descriptionField.isRequired}
                            onChange={descriptionField.handleChange} id="descriptionField" rows="8" style={{width:"80%"}}/>
                    </div>
                    <div>
                        <button type="submit" style={{ backgroundColor: "#141e30" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Change
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ChangeDescription
