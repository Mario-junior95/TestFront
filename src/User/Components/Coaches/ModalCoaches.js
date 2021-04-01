import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Modal.css";

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

import Axios from "axios";

const ModalCoaches = (props) => {
  const [value, onChange] = useState(new Date());

  const [listTime, setListTime] = useState([]);
  const [timeMessage, setTimeMessage] = useState("");

  const [dataTime, setDataTime] = useState([]);
  const [timeById, setTimeById] = useState("");

  const [success, setSuccess] = useState("");

  /**   Error Times */
  const [error, setError] = useState("");

  const Time = () => {
    Axios.get("http://localhost:8000/api/time").then((response) => {
      setListTime(response.data.time);
      setTimeMessage("Pick A Time");
      console.log(value);
    });
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  let currentDate = new Date();

  const history = useHistory();

  return (
    <div id="modal">
      <div className="modal-bg">
        <div className="modal-cont">
          <h2 style={{ color: "black", fontSize: "15px" }}>
            Booking with {props.val.name}
          </h2>
          <h2 style={{ color: "black", fontSize: "15px" }}>Pick A Day</h2>
          <a href="#" className="close close1">
            <svg viewBox="0 0 24 24">
              <path
                d="M14.1,12L22,4.1c0.6-0.6,0.6-1.5,0-2.1c-0.6-0.6-1.5-0.6-2.1,0L12,9.9L4.1,2C3.5,1.4,2.5,1.4,2,2C1.4,2.5,1.4,3.5,2,4.1
      L9.9,12L2,19.9c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l7.9-7.9l7.9,7.9c0.3,0.3,0.7,0.4,1.1,0.4
      s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L14.1,12z"
              />
            </svg>
          </a>
          <p>
            <Calendar onChange={onChange} value={value} onClickDay={Time} />
          </p>
          {!error ? (
            ((
              <h2 style={{ color: "black", fontSize: "15px" }}>
                {timeMessage}
              </h2>
            ),
            (<h2 style={{ color: "green", fontSize: "15px" }}>{success}</h2>))
          ) : (
            <h2 style={{ color: "red", fontSize: "15px" }}>{error}</h2>
          )}

          {value.getDate() >= currentDate.getDate() ||
          value.getTime() >= currentDate.getTime() ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {listTime.map((val, index) => {
                const handleAdd = async (e) => {
                  e.preventDefault();
                  const data = new FormData();
                  data.append("user_id", localStorage.getItem("idUser"));
                  data.append("instructor_id", props.val.id);
                  data.append("time_id", val.id);
                  data.append("date", value);

                  try {
                    await Axios.post(
                      "http://localhost:8000/api/userIntsructorTime",
                      data,
                      {
                        headers: {
                          "content-type": "multipart/form-data",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    ).then((response) => {
                      if (
                        response.data.status === "Token is Expired" ||
                        response.data.status === "Token is Invalid" ||
                        response.data.status === "Authorization Token not found"
                      ) {
                        expireToken();
                        return window.location.reload();
                      } else {
                        setDataTime(response.data.userInstTime);
                        setTimeById(val.id);
                        setError("");
                        setSuccess(
                          `Your booking has been approved from ${val.start} until ${val.end}`
                        );
                        setTimeout(() => {
                          history.push("/payment");
                        }, 2500);
                      }
                    });
                  } catch (error) {
                    if (error.response) {
                      console.log(error);
                      setError("Already Taken");
                    }
                  }
                };

                return (
                  <div key={val.id}>
                    <button className="btnSession" onClick={handleAdd}>
                      {val.start} {val.end}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: "block" }}>
              <p style={{ color: "red" }}>
                You should pick from the current date or above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCoaches;
