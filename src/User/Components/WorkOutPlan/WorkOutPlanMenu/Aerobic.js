import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Navigation/Header";
import "./Gym.css";

import Axios from "axios";

const Aerobic = () => {
  const [listMembership, setListMembership] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/membership").then((response) => {
      setListMembership(response.data.membership);
    });
  }, []);

  const [warning, setWarning] = useState("");

  const history = useHistory();

  const routeChange = () => {
    let path = `/SignIn`;
    history.push(path);
  };

  const routeChangeToPayement = () => {
    let path = "/payment";
    history.push(path);
  };

  const RedirectToLogin = () => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("membership_id") > 1) {
        setWarning("You already subscribed to a class");
      } else {
        routeChangeToPayement();
      }
    } else {
      setWarning("You should Login First before Subscribe");
      setTimeout(() => {
        routeChange();
      }, 3000);
    }
  };

  return (
    <div className="App" className="workout">
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="home">
            <div className="benefitsCards">
              {listMembership.map((val, index) => {
                if (index !== 0 && index === 5) {
                  return (
                    <div className="cardBox" key={val.id}>
                      <div className="card">
                        <div className="front">
                          <h3>{val.name}</h3>
                          <p>{val.benefits}</p>
                        </div>
                        <div className="back">
                          <p style={{ color: "red" }}>{warning}</p>
                          <h3>{val.name}</h3>
                          <p>
                            {val.amount}
                            {"$"}
                          </p>
                          <p>{val.date}</p>
                          <button
                            className="btnLogin"
                            onClick={RedirectToLogin}
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {listMembership.map((val, index) => {
                if (index !== 0 && index === 6) {
                  return (
                    <div className="cardBox" key={val.id}>
                      <div className="card">
                        <div className="front">
                          <h3>{val.name}</h3>
                          <p>{val.benefits}</p>
                        </div>
                        <div className="back">
                          <p style={{ color: "red" }}>{warning}</p>
                          <h3>{val.name}</h3>
                          <p>
                            {val.amount}
                            {"$"}
                          </p>
                          <p>{val.date}</p>
                          <button
                            className="btnLogin"
                            onClick={RedirectToLogin}
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aerobic;
