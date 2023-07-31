import React, { useState, useEffect } from "react";
import axios from "axios";
import { stateAbbreviations, apiURL, getChartData } from "./utils.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Form, Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const CovidTracker = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(10);
  const [selectedState, setSelectedState] = useState("az"); // Default state: Arizona

  const fetchData = async () => {
    try {
      const response = await axios.get(apiURL(selectedState));
      setData(
        response.data.slice(
          0,
          days === undefined || days === null || days === 0 || !days ? 10 : days
        )
      );
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
      <select
        className="mt-3"
        value={selectedState}
        onChange={handleStateChange}
      >
        {Object.keys(stateAbbreviations).map((item) => {
          return <option value={stateAbbreviations[item]}>{item}</option>;
        })}
      </select>
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(days);
    fetchData();
  };

  return (
    <div className="container">
      <h3 className="mt-3">
        COVID Cases in {selectedState.toLocaleUpperCase()}
      </h3>

      {showStateFilter()}
      <div className="d-flex justify-content-center mt-5">
        {/* <div className="col-8"> */}
        <Form onSubmit={onFormSubmit}>
          <div className="row">
            <div className="col-12">
              <Form.Group className="col-7 mb-3" controlId="formBasicEmail">
                <div className="row">
                  <div className="col-6">
                    <Form.Label>
                      Until how many days you want to see data?{" "}
                    </Form.Label>
                  </div>
                  <div className="col-3">
                    <Form.Control
                      type="number"
                      placeholder="Eg - 5,10,15,20"
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </div>
                  <div className="col-3">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
                <Form.Text className="text-muted">
                  You can see the data till March 7th 2021. By default you will
                  see result of past 10 days from March 7th 2021
                </Form.Text>
              </Form.Group>
            </div>
          </div>
        </Form>
        {/* </div> */}
      </div>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-6">
          <Line data={getChartData(data)} />
        </div>
      </div>
    </div>
  );
};

export default CovidTracker;
