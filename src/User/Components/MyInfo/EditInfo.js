import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Header from "../Navigation/Header";
import Axios from "axios";
import "./MyInfo.scss";

import Punshing from "../../../Images/punshing.png";

const EditInfo = () => {
  const [newFirstName, setnewFirstName] = useState("");
  const [newLastName, setnewLastName] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [newAddress, setnewAddress] = useState("");
  const [newDate, setnewDate] = useState("");
  const [newGender, setnewGender] = useState("");
  const [success, setSuccess] = useState("");
  // const [memberShipId , setMemberShipId] = useState(0);

  const history = useHistory();

  const routeChange = () => {
    let path = `/SignIn`;
    history.push(path);
  };

  const [, setListMember] = useState([]);

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
        response.data.status === "Token is Invalid" ||
        response.data.status === "Authorization Token not found" ||
        response.data.status === "Token is Invalid" ||
        response.data.status === "Authorization Token not found"
      ) {
        expireToken();
        return window.location.reload();
      } else {
        setnewFirstName(response.data.user.firstname);
        setnewLastName(response.data.user.lastname);
        setnewGender(response.data.user.gender);
        setnewDate(response.data.user.date);
        setnewPhone(response.data.user.phone);
        setnewEmail(response.data.user.email);
        setnewAddress(response.data.user.address);
      }
    });
  }, []);

  /** Error States */

  const [newFirstNameErr, setnewFirstNameErr] = useState("");
  const [newLastNameErr, setnewLastNameErr] = useState("");
  const [newEmailErr, setnewEmailErr] = useState("");
  const [newPhoneErr, setnewPhoneErr] = useState("");
  const [newAddressErr, setnewAddressErr] = useState("");
  const [newDateErr, setnewDateErr] = useState("");
  const [newGenderErr, setnewGenderErr] = useState("");

  const handleEdit = async () => {
    const data = new FormData();
    data.append("firstname", newFirstName);
    data.append("lastname", newLastName);
    data.append("email", newEmail);
    data.append("phone", newPhone);
    data.append("address", newAddress);
    data.append("date", newDate);
    data.append("gender", newGender);

    try {
      await Axios.post(
        `http://localhost:8000/api/user/${localStorage.getItem(
          "idUser"
        )}?_method=PUT`,
        data
      ).then((response) => {
        setListMember(response.data);
        setSuccess("Edit Info successfully");
        setTimeout(() => {
          setSuccess("");
          routeChange();
        }, 4000);
      });
    } catch (error) {
      if (error.response) {
        setnewFirstNameErr(error.response.data.errors.firstname);
        setnewLastNameErr(error.response.data.errors.lastname);
        setnewEmailErr(error.response.data.errors.email);
        setnewPhoneErr(error.response.data.errors.phone);
        setnewAddressErr(error.response.data.errors.address);
        setnewDateErr(error.response.data.errors.date);
        setnewGenderErr(error.response.data.errors.gender);
        console.log(error.response.data.errors.date);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        <img
          className="imageEdit"
          src={Punshing}
          alt="error_wallWorkout"
          style={{
            width: "40vw",
            height: "40vw",
            position: "fixed",
            position: "fixed",
            left: "16.8vw",
            top: "9vw",
          }}
        />
        <div className="container">
          <div className="wrapper">
            <div className="home">
              <div className="arrows">
                <input
                  type="checkbox"
                  id="animation3"
                  onClick={() =>
                    setTimeout(() => {
                      routeChange();
                    }, 1500)
                  }
                />
                <label htmlFor="animation3">
                  <div className="arrow"></div>
                </label>
              </div>
              <div className="blockEditInfo SignUpSide">
                <span style={{ color: "green" }}>{success}</span>
                <h1 style={{ fontSize: "40px" }}>Edit My Info</h1>
                <form>
                  <span style={{ color: "red" }}>{newFirstNameErr}</span>
                  {newFirstNameErr ? (
                    <label>
                      <input
                        type="text"
                        style={{ borderBottom: "1px red solid" }}
                        onChange={(e) => {
                          setnewFirstName(e.target.value);
                          setnewFirstNameErr("");
                        }}
                      />
                      <div className="label-text">First Name</div>
                    </label>
                  ) : (
                    <label>
                      <input
                        type="text"
                        value={newFirstName}
                        onChange={(e) => {
                          setnewFirstName(e.target.value);
                          setnewFirstNameErr("");
                        }}
                      />
                      <div className="label-text">First Name</div>
                    </label>
                  )}
                  <span style={{ color: "red" }}>{newLastNameErr}</span>
                  {newLastNameErr ? (
                    <label>
                      <input
                        type="text"
                        style={{ borderBottom: "1px red solid" }}
                        onChange={(e) => {
                          setnewLastName(e.target.value);
                          setnewLastNameErr("");
                        }}
                      />
                      <div className="label-text">Last Name</div>
                    </label>
                  ) : (
                    <label>
                      <input
                        type="text"
                        value={newLastName}
                        onChange={(e) => {
                          setnewLastName(e.target.value);
                          setnewLastNameErr("");
                        }}
                      />
                      <div className="label-text">Last Name</div>
                    </label>
                  )}
                  <span style={{ color: "red" }}>{newEmailErr}</span>
                  {newEmailErr ? (
                    <label>
                      <input
                        type="newEmail"
                        style={{ borderBottom: "1px red solid" }}
                        onChange={(e) => {
                          setnewEmail(e.target.value);
                          setnewEmailErr("");
                        }}
                      />
                      <div className="label-text">newEmail</div>
                    </label>
                  ) : (
                    <label>
                      <input
                        type="newEmail"
                        value={newEmail}
                        onChange={(e) => {
                          setnewEmail(e.target.value);
                          setnewEmailErr("");
                        }}
                      />
                      <div className="label-text">newEmail</div>
                    </label>
                  )}
                  <span style={{ color: "red" }}>{newPhoneErr}</span>
                  {newPhoneErr ? (
                    <label>
                      <input
                        type="tel"
                        onChange={(e) => {
                          setnewPhone(e.target.value);
                          setnewPhoneErr("");
                        }}
                        style={{ borderBottom: "1px red solid" }}
                      />
                      <div className="label-text">newPhone</div>
                    </label>
                  ) : (
                    <label>
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={(e) => {
                          setnewPhone(e.target.value);
                          setnewPhoneErr("");
                        }}
                      />
                      <div className="label-text">newPhone</div>
                    </label>
                  )}
                  <span style={{ color: "red" }}>{newAddressErr}</span>
                  {newAddressErr ? (
                    <label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setnewAddress(e.target.value);
                          setnewAddressErr("");
                        }}
                        style={{ borderBottom: "1px red solid" }}
                      />
                      <div className="label-text">newAddress</div>
                    </label>
                  ) : (
                    <label>
                      <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => {
                          setnewAddress(e.target.value);
                          setnewAddressErr("");
                        }}
                      />
                      <div className="label-text">newAddress</div>
                    </label>
                  )}{" "}
                  <span style={{ color: "red" }}>{newDateErr}</span>
                  {newDateErr ? (
                    <label>
                      <div>newDate of Birth</div>
                      <input
                        type="newDate"
                        onChange={(e) => {
                          setnewDate(e.target.value);
                          setnewDateErr("");
                        }}
                        style={{ border: "1px red solid" }}
                      />
                    </label>
                  ) : (
                    <label>
                      <div>newDate of Birth</div>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => {
                          setnewDate(e.target.value);
                          setnewDateErr("");
                        }}
                      />
                    </label>
                  )}
                  <span style={{ color: "red" }}>{newGenderErr}</span>
                  <div className="gender">
                    <label>
                      <span>Male</span>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={newGender === "Male"}
                        onChange={(e) => {
                          setnewGender("Male");
                          setnewGenderErr("");
                        }}
                      />
                    </label>
                    <label>
                      <span>Female</span>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={newGender === "Female"}
                        onChange={(e) => {
                          setnewGender("Female");
                          setnewGenderErr("");
                        }}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    value="Submit"
                    className="btnLogin"
                    onClick={(e) => {
                      handleEdit(localStorage.getItem("idUser"));
                      e.preventDefault();
                    }}
                    id="success"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
