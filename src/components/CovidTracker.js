import React, { useState, useEffect } from "react";
import axios from "axios";
import { stateAbbreviations } from "./data.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const CovidTracker = () => {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState("az"); // Default state: Arizona

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.covidtracking.com/v1/states/${selectedState}/daily.json`
      );
      setData(response.data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const showStateFilter = () => {
    return (
      <select value={selectedState} onChange={handleStateChange}>
        {Object.keys(stateAbbreviations).map((item) => {
          return <option value={stateAbbreviations[item]}>{item}</option>;
        })}
      </select>
    );
  };

  const formatDate = (date) => {
    const dateObj = new Date(
      date.slice(0, 4),
      date[4] + date[5] - 1,
      date[6] + date[7]
    );

    const adjustedMonth = dateObj.getMonth() + 1;

    const labelDate =
      adjustedMonth + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
    return labelDate;
  };

  const formatChartData = (caseType) => {
    const labels = data.map((item) => formatDate(item.date.toString()));

    console.log(
      data.map((item) =>
        caseType === "Positive" ? item.positiveIncrease : item.negativeIncrease
      )
    );
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Daily Rise of numbers in Covid-19 patients",
          data: data.map((item) => item.positiveIncrease),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Daily Fall of numbers in Covid-19 patients",
          data: data.map((item) => item.negativeIncrease),
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#742774",
          tension: 0.1,
        },
      ],
    };

    return chartData;
  };

  // const chart_data = formatChartData();

  return (
    <div>
      <h1>COVID Cases in {selectedState.toLocaleUpperCase()}</h1>

      {showStateFilter()}

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-6">
          <Line data={formatChartData("Positive")} />
        </div>
      </div>
    </div>
  );
};

export default CovidTracker;
