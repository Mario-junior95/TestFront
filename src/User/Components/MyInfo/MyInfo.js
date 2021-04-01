import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// import "./MyInfo.css";
import { Link } from "react-router-dom";
import Header from "../Navigation/Header";
import Male from "../../../Images/male.png";
import Female from "../../../Images/Female.png";
import UserAccount from "../UserAccount/UserAccount";
import Axios from "axios";
// import "../Navigation/Headers.css"

const MyInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

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
        setFirstName(response.data.user.firstname);
        setLastName(response.data.user.lastname);

        setDate(response.data.user.date);
        setPhone(response.data.user.phone);
        setEmail(response.data.user.email);
        setAddress(response.data.user.address);

        setGender(response.data.user.gender);
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
              <div
                className="sideBox"
                style={{
                  borderLeft: "1px white solid",
                  padding: "0 2vw",
                  height: "25vw",
                }}
              >
                <h1>My Info</h1>
                <Link exact="true" to="/editInfo">
                  {" "}
                  Edit Info
                </Link>
                <div>
                  <p>
                    First Name : <span className="infoText">{firstName}</span>
                  </p>
                  <p>
                    Last Name : <span className="infoText">{lastName}</span>
                  </p>
                  <p>
                    Email : <span className="infoText">{email}</span>
                  </p>
                  <p>
                    Phone : <span className="infoText">{phone}</span>
                  </p>
                  <p>
                    Address : <span className="infoText">{address}</span>
                  </p>
                  <p>
                    Date-Of-Birth : <span className="infoText">{date}</span>
                  </p>
                  <p>
                    Gender : <span className="infoText">{gender}</span>
                  </p>
                </div>
                <div>
                  {localStorage.getItem("gender") === "Male" ? (
                    <img
                      src={Male}
                      alt="error_male_img"
                      className="gender_male"
                      s
                      style={{
                        transform: "translate3d(65px, 10.63vw, 83px)",
                        marginTop: "-28vw",
                        marginLeft: "30vw",
                        height: "30vw",
                        position: "relative",
                        zIndex: "1001",
                      }}
                    />
                  ) : (
                    <img
                      src={Female}
                      alt="error_female_img"
                      className="gender_female"
                      style={{
                        transform: "translate3d(78px, 5.63vw, 83px)",
                        marginTop: "-28vw",
                        marginLeft: "37vw",
                        height: "35vw",
                        position: "relative",
                        zIndex: "1001",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
