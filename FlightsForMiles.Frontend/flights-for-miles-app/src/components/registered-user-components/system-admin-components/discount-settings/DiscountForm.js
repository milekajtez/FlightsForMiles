import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import {
  chageDiscount,
  loadDiscounts,
} from "../../../../redux/system-admin/discounts/discountsAction";

function DiscountForm(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const discountField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const discountForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(chageDiscount(discountField.value, props.discountType))
        .then((response) => {
          if (response.status === 204) {
            alert.show("Update discount successfully", {
              type: "success",
            });

            dispatch(loadDiscounts());
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (
            error.response.data.indexOf(
              "Value of 'Percent 300 points' must be smaller than 'Percent 600 points'"
            ) !== -1
          ) {
            alert.show(
              "Value of 'Percent 300 points' must be smaller than 'Percent 600 points'",
              {
                type: "error",
              }
            );
          } else if (
            error.response.data.indexOf(
              "Value of 'Percent 600 points' must be between 'Percent 300 points' and 'Percent 1200 points'"
            ) !== -1
          ) {
            alert.show(
              "Value of 'Percent 600 points' must be between 'Percent 300 points' and 'Percent 1200 points'",
              {
                type: "error",
              }
            );
          } else if (
            error.response.data.indexOf(
              "Value of 'Percent 1200 points' must be bigger than 'Percent 600 points'"
            ) !== -1
          ) {
            alert.show(
              "Value of 'Percent 1200 points' must be bigger than 'Percent 600 points'",
              {
                type: "error",
              }
            );
          } else {
            alert.show("unknown error.", {
              type: "error",
            });
          }
        });

      e.preventDefault();
      discountForm.handleReset();
    },
    fields: [discountField],
  });

  return (
    <>
      <br></br>
      <br></br>
      {props.discountType === "quick" ? (
        <label>Change 'quick reservation' discount</label>
      ) : props.discountType === "300" ? (
        <label>Change '300 - 600 points' discount</label>
      ) : props.discountType === "600" ? (
        <label>Change '600 - 1200 points' discount</label>
      ) : (
        <label>Change '&lt; 1200 points' discount</label>
      )}
      <form onSubmit={discountForm.handleSubmit}>
        <select
          value={discountField.value}
          required={discountField.isRequired}
          onChange={discountField.handleChange}
          id="discountField"
          style={{border: '2px solid black'}}
        >
          <option value=""> -- select an option --</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
          <option value="30">30%</option>
          <option value="35">35%</option>
          <option value="40">40%</option>
          <option value="45">45%</option>
          <option value="50">50%</option>
        </select>
        <button type="submit" style={{ backgroundColor: "#141e30" }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Change
        </button>
      </form>
    </>
  );
}

export default DiscountForm;
