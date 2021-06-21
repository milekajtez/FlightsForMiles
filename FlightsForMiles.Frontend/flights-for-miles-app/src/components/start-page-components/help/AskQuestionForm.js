import React from "react";
import { useAlert } from "react-alert";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { askQuestion } from "../../../redux/avio-admin/help/helpAction";

function AskQuestionForm(props) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const questionField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const askQuestionForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(askQuestion(questionField.value))
        .then((response) => {
          if (response.status === 201) {
            alert.show("Asking question successfully.", {
              type: "success",
            });

            askQuestionForm.handleReset();
            props.setAskQuestion(false);
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.indexOf(
              "(Add question unsuccessfully because server can't to add new question currently.)"
            ) !== -1
          ) {
            alert.show(
              "(Add question unsuccessfully because server can't to add new question currently.)",
              {
                type: "error",
              }
            );
          } else if (
            error.response.data.indexOf(
              "(Add question unsuccessfully. We already have the same question. Please find that in Help window.)"
            ) !== -1
          ) {
            alert.show(
              "Add question unsuccessfully. We already have the same question. Please find that in Help window.",
              {
                type: "error",
              }
            );
          } else {
            alert.show("Unknown error", {
              type: "error",
            });
          }
        });

      e.preventDefault();
    },
    fields: [questionField],
  });

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.askQuestionIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() => props.setAskQuestion(false)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <div className="login-box">
        <h2>ASK QUESTION</h2>
        <form onSubmit={askQuestionForm.handleSubmit}>
          <div className="user-box">
            <h6 style={{ color: "aqua" }}>Question</h6>
            <textarea
              type="text"
              value={questionField.value}
              required={questionField.isRequired}
              onChange={questionField.handleChange}
              id="descriptionField"
              rows="8"
              style={{ width: "80%" }}
            />
          </div>
          <div>
            <button type="submit" style={{ backgroundColor: "#141e30" }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Ask
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AskQuestionForm;
