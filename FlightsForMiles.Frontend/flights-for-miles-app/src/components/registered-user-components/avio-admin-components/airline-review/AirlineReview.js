import React from "react";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useDispatch } from "react-redux";
import { loadBitcoinDollarExchange } from "../../../../redux/avio-admin/dashboard/dashboardAction";
import { useSelector } from "react-redux";
import { loadAirlines } from "../../../../redux/system-admin/airline-reg/airlineRegAction";
import AirlineDashboardForm from "./AirlineDashboardForm";
import AirlineReviews from "../../../start-page-components/airline-and-flights/AirlinesAndFlights";
import { dayChartData, weekChartData, mounthChartData } from './chartData';
Chart.register(...registerables);

var arrayCharts = [];

function AirlineReview() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const airlines = useSelector((state) => state.airline);

  useEffect(() => {
    dispatch(loadBitcoinDollarExchange());
    dispatch(loadAirlines());
    

    arrayCharts = [];
    var ctxDay = document.getElementById("day");
    arrayCharts.push(new Chart(ctxDay, dayChartData));
    var ctxWeek = document.getElementById("week");
    arrayCharts.push(new Chart(ctxWeek, weekChartData));
    var ctxMounth = document.getElementById('mounth');
    arrayCharts.push(new Chart(ctxMounth, mounthChartData));
  }, [dispatch]);

  return (
    <div className="main">
      <div className="main-header">
        <div className="main-header__heading">
          Current exchange rate bitcoin: 1 ₿ = {dashboard.bitcoinDollarExchange}{" "}$
        </div>
      </div>
      <h3 style={{ color: "white" }}>ALL AIRLINES</h3>
      <AirlineReviews />
      <AirlineDashboardForm 
        airlines={airlines} 
        arrayCharts={arrayCharts}/>
    </div>
  );
}

export default AirlineReview;
