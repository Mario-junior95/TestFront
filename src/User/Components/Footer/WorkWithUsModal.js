import React, { useState } from "react";
// import "./WorkWithUs.scss";

import { Redirect } from "react-router-dom";

import Axios from "axios";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const WorkWithUsModal = (props) => {
  console.log("gi");

  const [email, setEmail] = useState("");
  const [image, setImage] = useState("null");
  const [message, setMessage] = useState("");

  const [listWorkWithUs, setListWorkWithUs] = useState([]);

  const [close, setClose] = useState("");

  /**   Error States */
  const [emailErr, setEmailErr] = useState("");
  const [imageErr, setImageErr] = useState(null);
  const [messageErr, setMessageErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setMessageErr("");
    setImageErr("");
    setEmailErr("");
    setMessage("");
    setEmail("");
    setImage("");
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("image", image);
    data.append("description", message);

    try {
      await Axios.post("http://localhost:8000/api/workwithus", data, {
        headers: {
          "content-type": "multipart/form-data",
          Accept:'application/json',
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
          setListWorkWithUs(response.data.workwithus);
          setSuccess("Your Application sended Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setEmailErr(error.response.data.errors.email);
        setMessageErr(error.response.data.errors.description);
        setImageErr(error.response.data.errors.image);
        // console.log(error.response.data.errors.image)
      }
    }
  };

  return (
    <Rodal
      visible={props.visible}
      onClose={props.hide}
      animation={props.animation}
      duration={props.duration}
      closeMaskOnClick={props.closeMaskOnClick}
      closeOnEsc={props.closeMaskOnClick}
      height={props.height}
      width={props.width}
    >
      <h1
        style={{
          marginTop: 0,
          color: "black",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Work With Us
      </h1>
      <form>
        {emailErr ? (
          <label>
            <input
              type="email"
              style={{ borderBottom: "2px red solid", color: "black" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
              }}
            />
            <div className="label-text" style={{ color: "red" }}>
              {emailErr}
            </div>
          </label>
        ) : (
          <label>
            <input
              type="email"
              style={{ borderBottom: "2px black solid", color: "black" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
              }}
            />
            <div className="label-text" style={{ color: "black" }}>
              Email
            </div>
          </label>
        )}

        {imageErr ? (
          <label>
            <input
              type="file"
              style={{ color: "black" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageErr("");
              }}
            />
            <div className="label-text" style={{ color: "red" }}>
              {imageErr}
            </div>
          </label>
        ) : (
          <label>
            <input
              type="file"
              style={{ color: "black" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageErr("");
              }}
            />
            <div className="label-text" style={{ color: "black" }}>
              Upload Your CV
            </div>
          </label>
        )}

        {messageErr ? (
          <label>
            <div className="label-text" style={{ color: "red" }}>
              {messageErr}
            </div>
            <textarea
              rows={7}
              cols={60}
              placeholder="Enter Your message Here..."
              style={{border:"1px red solid"}}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageErr("");
              }}
            ></textarea>
          </label>
        ) : (
          <label>
            <div className="label-text" style={{ color: "black" }}>
              Why I should Hire You
            </div>
            <textarea
              rows={7}
              cols={60}
              placeholder="Enter Your message Here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageErr("");
              }}
            ></textarea>
          </label>
        )}
        <button
          type="submit"
          value="Submit"
          className="btnLogin"
          style={{
            border: " 1px black solid",
            margin: "auto 9vw",
            color: "black",
          }}
          onClick={handleAdd}
        >
          Send
        </button>
      </form>
    </Rodal>
  );
};

export default WorkWithUsModal;
