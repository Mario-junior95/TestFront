import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Navigation/Header";
import UserAccount from "../UserAccount/UserAccount";
import "./Classes.css";

const Classes = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [render, setRender] = useState(false);
  const [listClasses, setListClasses] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [dates, setDates] = useState([]);


  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/SignIn" />;
  };

  useEffect(async () => {
    await Axios.get(
      `http://localhost:8000/api/user/${localStorage.getItem("idUser")}`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        setListClasses(response.data.user.membership);
        setListUsers(response.data.user.user_instructor);
        setListTime(response.data.user.user_time);
        setDates(response.data.user.dates);
        console.log(response.data.user);
        setName(response.data.user.membership[0].name);
        setAmount(response.data.user.membership[0].amount);
        setDate(response.data.user.membership[0].date);
        console.clear();
      }
    });
  }, []);

  return (
    <div className="LoginSection">
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="home">
            <div>
              <UserAccount />
              <table>
                <thead>
                  <tr>
                    <th>MemberShip Type</th>
                    <th> Amount </th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="infoText">{name}</span>
                    </td>
                    <td>
                      {" "}
                      <span className="infoText">
                        {amount}
                        {"$"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="infoText">{date}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h1 style={{ marginTop: "50px" }} className="reservePt">
                Reserved PT<sub>section</sub>
              </h1>
              <table style={{ width: "60%" }} className = "tableInstructor">
                <tr>
                  <th>Instructor</th>
                  <th>Date</th>
                  <th> Time Start </th>
                  <th>Time End</th>
                  <th>Price /hr</th>
                </tr>
                <tbody>
                  <tr>
                    {listUsers.map((val) => {
                      return (
                        <div key={val.id}>
                          <td>{val.name}</td>
                        </div>
                      );
                    })}
                    <td>
                      {dates.map((u) => {
                        return (
                          <div key={u.id}>
                            <td>{u.date.slice(0, 15)}</td>
                          </div>
                        );
                      })}
                    </td>
                    {listTime.map((val) => {
                      return (
                        <div>
                          <td>{val.start}</td>
                        </div>
                      );
                    })}
                    <td>
                      {listTime.map((i) => {
                        return (
                          <div key={i.id}>
                            <td>{i.end}</td>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      {listUsers.map((val) => {
                        return (
                          <div key={val.id}>
                            <td>{val.price + "$"}</td>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
