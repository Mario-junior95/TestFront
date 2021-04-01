import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Navigation/Header";
import Axios from "axios";
import "./Login.css";

const SingUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [memberShipId, setMemberShipId] = useState(1);

  const [, setListMember] = useState([]);

  /** Error States */

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // const [memberShipIdErr , setMemberShipIdErr] = useState(0);

  const [render, setRender] = useState(false);

  /**  Clear Data */

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDate("");
    setGender("");
    setPassword("");
    // setMemberShipId("");
    setFirstNameErr("");
    setLastNameErr("");
    setEmailErr("");
    setPhoneErr("");
    setAddressErr("");
    setDateErr("");
    setGenderErr("");
    setPasswordErr("");
    // setMemberShipIdErr("");
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/payment`;
    history.push(path);
    // window.location.reload(true);
  };

  const routeChangeToInfo = () => {
    let path = `/myinfo`;
    history.push(path);
    window.location.reload(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("date", date);
    data.append("gender", gender);
    data.append("password", password);
    data.append("membership_id", memberShipId);

    try {
      await Axios.post("http://localhost:8000/api/register", data).then(
        (response) => {
          setListMember(response.data);
          localStorage.setItem("idUser", response.data.user.id);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("firstname", response.data.user.firstname);
          localStorage.setItem("lastname", response.data.user.lastname);
          localStorage.setItem("phone", response.data.user.phone);
          localStorage.setItem("date", response.data.user.date);
          localStorage.setItem("gender", response.data.user.gender);
          localStorage.setItem("address", response.data.user.address);
          localStorage.setItem(
            "membership_id",
            response.data.user.membership_id
          );

          console.log(response.data);
          clearData();
          setSuccess("Sign Up successfully");
          setTimeout(() => {
            setSuccess("");
            if (response.data.user.membership_id === 1) {
              routeChangeToInfo();
            } else {
              routeChange();
            }
          }, 2000);
        }
      );
    } catch (error) {
      if (error.response) {
        setFirstNameErr(error.response.data.errors.firstname);
        setLastNameErr(error.response.data.errors.lastname);
        setEmailErr(error.response.data.errors.email);
        setPhoneErr(error.response.data.errors.phone);
        setAddressErr(error.response.data.errors.address);
        setDateErr(error.response.data.errors.date);
        setGenderErr(error.response.data.errors.gender);
        setPasswordErr(error.response.data.errors.password);
        // setMemberShipIdErr(error.response.data.errors.membership_id);
      }
    }
  };

  const [membership, setMemberShip] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/membership").then((response) => {
      setMemberShip(response.data.membership);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="home">
            <div className="blockSignUp SignUpSide">
              <span style={{ color: "green" }}>{success}</span>
              <h1 style={{ fontSize: "40px" }}>SIGN UP</h1>
              <form>
                <span style={{ color: "red" }}>{firstNameErr}</span>
                {firstNameErr ? (
                  <label>
                    <input
                      type="text"
                      value={firstName}
                      style={{ borderBottom: "1px red solid" }}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameErr("");
                      }}
                    />
                    <div className="label-text">First Name</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameErr("");
                      }}
                    />
                    <div className="label-text">First Name</div>
                  </label>
                )}
                <span style={{ color: "red" }}>{lastNameErr}</span>
                {lastNameErr ? (
                  <label>
                    <input
                      type="text"
                      value={lastName}
                      style={{ borderBottom: "1px red solid" }}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameErr("");
                      }}
                    />
                    <div className="label-text">Last Name</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameErr("");
                      }}
                    />
                    <div className="label-text">Last Name</div>
                  </label>
                )}
                <span style={{ color: "red" }}>{emailErr}</span>
                {emailErr ? (
                  <label>
                    <input
                      type="email"
                      value={email}
                      style={{ borderBottom: "1px red solid" }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailErr("");
                      }}
                    />
                    <div className="label-text">Email</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailErr("");
                      }}
                    />
                    <div className="label-text">Email</div>
                  </label>
                )}
                <span style={{ color: "red" }}>{phoneErr}</span>
                {phoneErr ? (
                  <label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneErr("");
                      }}
                      style={{ borderBottom: "1px red solid" }}
                    />
                    <div className="label-text">Phone</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneErr("");
                      }}
                    />
                    <div className="label-text">Phone</div>
                  </label>
                )}
                <span style={{ color: "red" }}>{addressErr}</span>
                {addressErr ? (
                  <label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressErr("");
                      }}
                      style={{ borderBottom: "1px red solid" }}
                    />
                    <div className="label-text">Address</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressErr("");
                      }}
                    />
                    <div className="label-text">Address</div>
                  </label>
                )}
                <span style={{ color: "red" }}>{dateErr}</span>
                {dateErr ? (
                  <label>
                    <div>Date of Birth</div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setDateErr("");
                      }}
                      style={{ border: "1px red solid" }}
                    />
                  </label>
                ) : (
                  <label>
                    <div>Date of Birth</div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setDateErr("");
                      }}
                    />
                  </label>
                )}
                <span style={{ color: "red" }}>{genderErr}</span>
                <div className="gender">
                  <label>
                    <span>Male</span>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => {
                        setGender("Male");
                        setGenderErr("");
                      }}
                    />
                  </label>
                  <label>
                    <span>Female</span>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => {
                        setGender("Female");
                        setGenderErr("");
                      }}
                    />
                  </label>
                </div>
                <span style={{ color: "red" }}>{passwordErr}</span>
                {passwordErr ? (
                  <label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordErr("");
                      }}
                      style={{ borderBottom: "1px red solid" }}
                    />
                    <div className="label-text">Password</div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordErr("");
                      }}
                    />
                    <div className="label-text">Password</div>
                  </label>
                )}
                <label>
                  <div>MemberShip Type</div>
                  <select
                    className="memberType"
                    onChange={(e) => {
                      setMemberShipId(e.target.value);
                    }}
                  >
                    {/* <option>--</option> */}
                    {membership.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <button
                  type="submit"
                  value="Submit"
                  className="btnLogin"
                  onClick={(e) => handleAdd(e)}
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
  );
};

export default SingUp;
