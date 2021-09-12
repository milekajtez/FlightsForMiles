import Modal from "react-modal";
import React from "react";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  changeQuestion,
  loadQuestions,
} from "../../../../redux/avio-admin/help/helpAction";

function AnswerQuestionForm(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const answerField = useFormField({
    initialValue: "",
    isRequired: false,
  });

  const answerForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(
        changeQuestion({
          questionID: props.answerIsOpen.currentQuest.questionID,
          questionText: props.answerIsOpen.currentQuest.questionText,
          answer: answerField.value,
        })
      )
        .then((response) => {
          if (response.status === 204) {
            alert.show("Update successfully.", {
              type: "success",
            });

            answerForm.handleReset();
            props.setAnswerIsOpen({
              open: !props.answerIsOpen.open,
              currentQuest: props.answerIsOpen.currentQuest,
            });

            dispatch(loadQuestions());
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
              "(Update unsuccessfully. Server not found any question.)"
            ) !== -1
          ) {
            alert.show(
              "Update unsuccessfully. Server not found any question.",
              {
                type: "error",
              }
            );
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        });

      e.preventDefault();
    },
    fields: [answerField],
  });

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.answerIsOpen.open}
      closeTimeoutMS={500}
      className="new-member-inner-login"
      onRequestClose={() =>
        props.setAnswerIsOpen({
          open: !props.answerIsOpen.open,
          currentQuest: props.answerIsOpen.currentQuest,
        })
      }
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
        <div style={{ color: "#fff", marginTop: "1%", textAlign: "center" }}>
          <h2>ANSWER ON QUESTION</h2>
          {props.answerIsOpen.currentQuest.questionText}
        </div>
        <hr style={{ backgroundColor: "aqua" }}></hr>
        <p style={{ color: "white" }}>Current answer:</p>
        <p style={{ color: "white" }}>
          {props.answerIsOpen.currentQuest.answer}
        </p>
        <hr style={{ backgroundColor: "aqua" }}></hr>
        <form onSubmit={answerForm.handleSubmit}>
          <div className="user-box">
            <h6 style={{ color: "white" }}>Answer:</h6>
            <textarea
              type="text"
              value={answerField.value}
              required={answerField.isRequired}
              onChange={answerField.handleChange}
              id="answerField"
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
              Answer
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AnswerQuestionForm;
