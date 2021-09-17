import React from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import { addNewTimeValueAction } from "../../../../redux/avio-admin/dashboard/dashboardAction";

function AirlineTimeRangeForm(props) {
  const dashboard = useSelector((state) => state.dashboard);
  const alert = useAlert();
  const startTimeField = useFormField({
    initialValue: "",
    isRequired: true,
  });
  const endTimeField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const timeChartForm = useFormWithFields({
    onSubmit: (e) => {
      if (new Date(startTimeField.value) >= new Date(endTimeField.value)) {
        alert.show("Start date must be before end date.", {
          type: "error",
        });
      } else {
        if (dashboard.ticketsForEnteredAirline.length === 0) {
          alert.show("It is necessary to choose the airline first.", {
            type: "error",
          });
        } else {
          var newValue = 0;
          dashboard.ticketsForEnteredAirline.data.forEach((element) => {
            if (
              new Date(element.purchasedTime) >=
                new Date(startTimeField.value) &&
              new Date(element.purchasedTime) <= new Date(endTimeField.value)
            ) {
              newValue += 1;
            }
          });

          props.timeChart.data.datasets[0].data[0] = newValue;
          props.timeChart.update();

          alert.show("Successfully loading data.", {
            type: "success",
          });

          timeChartForm.handleReset();
          addNewTimeValueAction(newValue);
        }
      }
      e.preventDefault();
    },
    fields: [startTimeField, endTimeField],
  });
  return (
    <>
      <div className="box" style={{ alignItems: "center" }}>
        <form onSubmit={timeChartForm.handleSubmit}>
          <div>
            <span>
              <label
                style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                Start date time:{" "}
              </label>
              <input
                type="date"
                value={startTimeField.value}
                required={startTimeField.isRequired}
                onChange={startTimeField.handleChange}
                id="startTimeField"
                style={{ border: "2px solid black" }}
              ></input>
            </span>
            <span>
              <label
                style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                End date time:{" "}
              </label>
              <input
                type="date"
                value={endTimeField.value}
                required={endTimeField.isRequired}
                onChange={endTimeField.handleChange}
                id="endTimeField"
                style={{ border: "2px solid black" }}
              />
            </span>
          </div>
          <div>
            <button
              type="submit"
              style={{ margin: "0 0 20px 0", backgroundColor: "#141e30" }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Load airline time graphic data
            </button>
          </div>
        </form>
      </div>
      <div className="main-overview" style={{ margin: "0 350px 0 350px" }}>
        <div className="overviewcard">
          <div className="main-header__updates">
            <canvas id="time"></canvas>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}

export default AirlineTimeRangeForm;
