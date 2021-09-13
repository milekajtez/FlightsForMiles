import React from "react";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useDispatch } from "react-redux";
import { loadBitcoinDollarExchange } from "../../../../redux/avio-admin/dashboard/dashboardAction";
import { useSelector } from "react-redux";
import { loadAirlines } from "../../../../redux/system-admin/airline-reg/airlineRegAction";
import AirlineDashboardForm from "./AirlineDashboardForm";
import AirlineReviews from "../../../start-page-components/airline-and-flights/AirlinesAndFlights";
import { useState } from "react";
Chart.register(...registerables);

function AirlineReview() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const airlines = useSelector((state) => state.airline);

  const [hoursArray, setHoursArray] = useState([]);
  const [daysArray, setDaysArray] = useState([]);
  const [mounthsArray, setMounthsArray] = useState([]);

  const calucateDataForHoursCharts = () => {
    // ovde ce se raditi kreiranje niza za sate
  };

  const calucateDataForDaysCharts = () => {
    // ovde ce se raditi kreiranje niza za dane
  };

  const calucateDataForMounthsCharts = () => {
    // ovde ce se raditi kreiranje niza za mesece
  };

  useEffect(() => {
    dispatch(loadBitcoinDollarExchange());
    dispatch(loadAirlines());

    var ctxDay = document.getElementById("day");
    new Chart(ctxDay, {
      type: "bar",
      data: {
        labels: [
          "00:00 - 04:00",
          "04:00 - 08:00",
          "08:00 - 12:00",
          "12:00 - 16:00",
          "16:00 - 20:00",
          "20:00 - 00:00",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3], //ovde ce ici hoursArray
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var ctxWeek = document.getElementById("week");
    new Chart(ctxWeek, {
      type: "bar",
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 8], //ovde ce ici daysArray
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 200, 35, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 200, 35, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var ctxMounth = document.getElementById('mounth');
    new Chart(ctxMounth, {
      type: "doughnut",
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
        'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 8, 7, 7, 7, 7, 7], //ovde ce ici mounthsArray
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 200, 35, 0.2)",
              "rgba(255, 200, 35, 0.2)",
              "rgba(255, 200, 35, 0.2)",
              "rgba(255, 200, 35, 0.2)",
              "rgba(255, 200, 35, 0.2)",
              "rgba(255, 200, 35, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 200, 35, 1)",
              "rgba(255, 200, 35, 1)",
              "rgba(255, 200, 35, 1)",
              "rgba(255, 200, 35, 1)",
              "rgba(255, 200, 35, 1)",
              "rgba(255, 200, 35, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        radius: 200,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [dispatch]);

  return (
    <div className="main">
      <div className="main-header">
        <div className="main-header__heading">
          Current exchange rate bitcoin: 1 $ = {dashboard.bitcoinDollarExchange}{" "}
          ₿
        </div>
      </div>
      <h3 style={{ color: "white" }}>ALL AIRLINES</h3>
      <AirlineReviews />
      <AirlineDashboardForm airlines={airlines} />
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
            <canvas id='mounth' height={500}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirlineReview;
