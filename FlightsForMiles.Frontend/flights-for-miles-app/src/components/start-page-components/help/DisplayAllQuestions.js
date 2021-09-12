import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadQuestions } from "../../../redux/avio-admin/help/helpAction";

function DisplayAllQuestions() {
  const dispatch = useDispatch();

  const helpData = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(loadQuestions());
  }, [dispatch]);

  return (
    <div className="accordion-wrapper">
      {helpData.allQuestions.map((question, index) => {
        return (
          <div className="accordion" key={index}>
            <input
              type="radio"
              name="radio-a"
              id={question.questionID}
              defaultChecked
              className="accordition-input"
            />
            <label className="accordion-label" htmlFor={question.questionID}>
              {question.questionText}
            </label>
            <div className="accordion-content">
              <p>{question.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayAllQuestions;
