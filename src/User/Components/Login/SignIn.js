import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../Navigation/Header";
import Axios from "axios";
import "./Login.css";

import Loading from "../../../Loading/Loading";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** error states */

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [handleError, setHandleError] = useState("");

  /** Handle Reset */

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setPasswordErr("");
    setEmailErr("");
    setHandleError("");
  };

  const Login = async (e) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8000/api/login", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        handleReset();
        localStorage.setItem("idUser", response.data.user.id);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("firstname", response.data.user.firstname);
        localStorage.setItem("lastname", response.data.user.lastname);
        localStorage.setItem("phone", response.data.user.phone);
        localStorage.setItem("date", response.data.user.date);
        localStorage.setItem("gender", response.data.user.gender);
        localStorage.setItem("address", response.data.user.address);
        localStorage.setItem("membership_id", response.data.user.membership_id);

        window.location.reload(true);
      });
    } catch (error) {
      if (error.response) {
        try {
          setEmailErr(error.response.data.errors.email);
          setPasswordErr(error.response.data.errors.password);
        } catch (error) {
          setHandleError("Invalid Username or password");
        }
      }
    }
  };

   /**   For Loading */
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     setTimeout(() => setLoading(false), 4550);
   }, []);

  return (
    <>
      {loading === false ? (
    <div className="LoginSection">
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="home">
            <div className="block">
              <section className="leftSide">
                <h1>Sign In</h1>
                <h2>Already have an account...</h2>
                <form>
                  <span style={{ color: "red" }}>{handleError}</span>
                  <span style={{ color: "red" }}>{emailErr}</span>
                  {emailErr ? (
                    <label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailErr("");
                        }}
                        style={{ borderBottom: "1px red solid" }}
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
                  <span style={{ color: "red" }}>{passwordErr}</span>
                  {passwordErr ? (
                    <label>
                      <input
                        style={{ borderBottom: "1px red solid" }}
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordErr("");
                        }}
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
                  <button
                    type="submit"
                    value="Submit"
                    className="btnLogin"
                    onClick={(e) => Login(e)}
                  >
                    Sign In
                  </button>
                  {localStorage.getItem("token") ? (
                    <Redirect to="/myinfo" />
                  ) : (
                    <Redirect to="/SignIn" />
                  )}
                </form>
              </section>
              <section className="rightSide">
                <h1>Sign Up</h1>
                <h2>
                  New customers sign up here
                  <br />
                  <br />
                  In order to book a class you must sign up <br />
                  for a user account
                </h2>
                <Link exact="true" to="/SignUp">
                  <button type="submit" value="Submit" className="btnLogin">
                    Sign Up
                  </button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
      ):<Loading/>}
      </>
  );
};

export default SignIn;
