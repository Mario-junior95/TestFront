import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Navigation/Header";
import Footer from "../Footer/Footer";
import Punsh from "../../../Images/mma.jpg";
import Axios from "axios";

import Loading from "../../../Loading/Loading";
import './ContactUs.css';

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);

  const [success, setSuccess] = useState("");

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  /**    Error States */
  const [emailErr, setEmailErr] = useState("");
  const [messageErr, setMessageErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  /** Clear Data */
  const clearData = () => {
    setEmail("");
    setEmailErr("");
    setMessage("");
    setMessageErr("");
  };

  const AddMessage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("message", message);

    try {
      await Axios.post("http://localhost:8000/api/contactus", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else {
          setListMessages(response.data.contactus);
          setSuccess("Message Sended Successfully!!!");
          setTimeout(() => {
            setSuccess("");
          }, 1600);
          clearData();
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setEmailErr(error.response.data.errors.email);
        setMessageErr(error.response.data.errors.message);
      }
    }
  };
  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="container">
            <div className="wrapper">
              <div className="home">
                <div className = "contactUs">
                  <h1
                    style={{
                      fontSize: "5vw",
                      marginTop: "9vw",
                      marginBottom: "7vw",
                    }}
                  >
                    Contact<sub>Us</sub>
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "43vw",
                      marginTop: "-2vw",
                      marginBottom: "4vw",
                    }}
                  >
                    <section
                      style={{
                        marginLeft: "-42vw",
                        marginTop: "-2vw",
                        marginBottom: "4vw",
                        borderLeft: "2px white solid",
                        paddingLeft: "2vw",
                        height: "30vw",
                      }}
                    >
                      <span style={{ color: "green" }}>{success}</span>
                      <form>
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
                            <div
                              className="label-text"
                              style={{ color: "red" }}
                            >
                              Email
                            </div>
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
                        <span style={{ color: "red" }}>{messageErr}</span>

                        {messageErr ? (
                          <label>
                            <textarea
                              rows="10"
                              cols="52"
                              style={{ border: "1px red solid" }}
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageErr("");
                              }}
                              placeholder="Enter your message here...."
                            ></textarea>
                            <div
                              className="label-text"
                              style={{ color: "red" }}
                            >
                              Message
                            </div>
                          </label>
                        ) : (
                          <label>
                            <textarea
                              rows="10"
                              cols="52"
                              style={{ border: "6px white solid" }}
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                setMessageErr("");
                              }}
                              placeholder="Enter your message here...."
                            ></textarea>
                            <div className="label-text">Message</div>
                          </label>
                        )}

                        <button
                          type="submit"
                          value="Submit"
                          className="btnLogin"
                          onClick={AddMessage}
                        >
                          Send
                        </button>
                      </form>
                    </section>
                    <section className = "imgContactUs">
                      <img
                        src={Punsh}
                        alt="error_push_image"
                        style={{ marginTop: "-10vw" }}
                      />
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ContactUs;
