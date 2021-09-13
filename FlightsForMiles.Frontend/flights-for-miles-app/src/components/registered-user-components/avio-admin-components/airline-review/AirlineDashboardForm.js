import React from "react";
//import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { loadTicketsForEnteredAirline } from "../../../../redux/avio-admin/dashboard/dashboardAction";

function AirlineDashboardForm(props) {
  //const alert = useAlert();
  const dispatch = useDispatch();
  const airlineField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const airlineForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(loadTicketsForEnteredAirline(airlineField.value))
      e.preventDefault();
      airlineForm.handleReset();
    },
    fields: [airlineField],
  });
  return (
    <div
      className="box"
      style={{ alignItems: "center", display: "inline-block" }}
    >
      <form onSubmit={airlineForm.handleSubmit}>
        <select
          value={airlineField.value}
          required={airlineField.isRequired}
          onChange={airlineField.handleChange}
          id="airlineField"
          style={{ border: "2px solid black" }}
        >
          <option value=""> -- select an airline --</option>
          {props.airlines.allAirlines.map((airline) => {
            return (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            );
          })}
        </select>
        <br></br>
        <button type="submit" style={{ backgroundColor: "#141e30" }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          LOAD AIRLINE GRAPHIC
        </button>
      </form>
    </div>
  );
}

export default AirlineDashboardForm;
