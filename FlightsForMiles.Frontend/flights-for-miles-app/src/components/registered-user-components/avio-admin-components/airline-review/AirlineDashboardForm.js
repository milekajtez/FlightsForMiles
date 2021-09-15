import React from "react";
import { useDispatch } from "react-redux";
import { useFormField, useFormWithFields } from "react-use-form-hooks";
import {
  loadTicketsForEnteredAirline,
  loadTicketsForEnteredAirlineAction,
} from "../../../../redux/avio-admin/dashboard/dashboardAction";

function AirlineDashboardForm(props) {
  const dispatch = useDispatch();
  const airlineField = useFormField({
    initialValue: "",
    isRequired: true,
  });

  const changeAirlineDayChartData = (type, ticketsForEnteredAirline) => {
    var newHours = [0, 0, 0, 0, 0, 0];
    var newDays = [0, 0, 0, 0, 0, 0, 0];
    var newMounths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    ticketsForEnteredAirline.forEach((element) => {
      var newDate = new Date(element.purchasedTime);
      if (type === "day") {
        var currentHour = newDate.getHours();
        if (currentHour >= 0 && currentHour < 4) {
          newHours[0] += 1;
        } else if (currentHour >= 4 && currentHour < 8) {
          newHours[1] += 1;
        } else if (currentHour >= 8 && currentHour < 12) {
          newHours[2] += 1;
        } else if (currentHour >= 12 && currentHour < 16) {
          newHours[3] += 1;
        } else if (currentHour >= 16 && currentHour < 24) {
          newHours[4] += 1;
        } else {
          newHours[5] += 1;
        }
        props.arrayCharts[0].data.datasets[0].data = newHours;
        props.arrayCharts[0].update();
      } else if (type === "week") {
        var currentDay = newDate.getDay();
        if (currentDay === 0) {
          newDays[6] += 1;
        } else if (currentDay === 1) {
          newDays[0] += 1;
        } else if (currentDay === 2) {
          newDays[1] += 1;
        } else if (currentDay === 3) {
          newDays[2] += 1;
        } else if (currentDay === 4) {
          newDays[3] += 1;
        } else if (currentDay === 5) {
          newDays[4] += 1;
        } else {
          newDays[5] += 1;
        }
        props.arrayCharts[1].data.datasets[0].data = newDays;
        props.arrayCharts[1].update();
      } else {
        var currentMounth = newDate.getMonth();
        if (currentMounth === 0) {
          newMounths[11] += 1;
        } else if (currentMounth === 1) {
          newMounths[0] += 1;
        } else if (currentMounth === 2) {
          newMounths[1] += 1;
        } else if (currentMounth === 3) {
          newMounths[2] += 1;
        } else if (currentMounth === 4) {
          newMounths[3] += 1;
        } else if (currentMounth === 5) {
          newMounths[4] += 1;
        } else if (currentMounth === 6) {
          newMounths[5] += 1;
        } else if (currentMounth === 7) {
          newMounths[6] += 1;
        } else if (currentMounth === 8) {
          newMounths[7] += 1;
        } else if (currentMounth === 9) {
          newMounths[8] += 1;
        } else if (currentMounth === 10) {
          newMounths[9] += 1;
        } else {
          newMounths[10] += 1;
        }
        props.arrayCharts[2].data.datasets[0].data = newMounths;
        props.arrayCharts[2].update();
      }
    });
  };

  const airlineForm = useFormWithFields({
    onSubmit: (e) => {
      dispatch(loadTicketsForEnteredAirline(airlineField.value, dispatch))
        .then((response) => {
          dispatch(loadTicketsForEnteredAirlineAction(response));
          changeAirlineDayChartData("day", response.data);
          changeAirlineDayChartData("week", response.data);
          changeAirlineDayChartData("mounth", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      e.preventDefault();
      airlineForm.handleReset();
    },
    fields: [airlineField],
  });

  return (
    <>
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
      <div className="main-overview">
        <div className="overviewcard">
          <div className="main-header__updates">
            <canvas id="day"></canvas>
          </div>
        </div>
        <div className="overviewcard">
          <div className="main-header__updates">
            <canvas id="week"></canvas>
          </div>
        </div>
      </div>
      <div className="main-overview">
        <div className="overviewcard">
          <div className="main-header__updates">
            <canvas id="mounth" height={500}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default AirlineDashboardForm;
