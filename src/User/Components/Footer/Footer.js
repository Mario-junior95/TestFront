import React, { useState } from "react";
import LogoWhite from "../../../Images/logoWhite.svg";
import { Link } from "react-router-dom";

import "./Footer.css";
import $ from "jquery";
import "./WorkWithUs.scss";

import WorkWithUsModal from "./WorkWithUsModal";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "8vw",
        paddingBottom: "2vw",
        position: "relative",
        zIndex: "1",
      }}
      className="footer_section"
    >
      <div
        style={{
          borderLeft: "1px white solid",
          paddingLeft: "2vw",
          height: "13vw",
        }}
        className="border"
      >
        <div style={{ height: 2 }} className="hover">
          <Link to="/">
            <img src={LogoWhite} alt="error_logo" className="footerImg" />
          </Link>
          <div className="copyright copyrights copyrightWorkouts">
            <span style={{ color: "white" }}>CopyRight Ⓒ 2021 .</span>
            <br />
            <span
              style={{ fontWeight: "bold", fontSize: "15px" }}
              className="myName"
            >
              <a
                target="_blank"
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=karehmario@gmail.com"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "rgb(139, 135, 128)",
                }}
              >
                Mario-Junior K.
              </a>
            </span>
            <br />
            <span style={{ color: "white" }}>All Rights Reserved</span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px white solid",
          paddingLeft: "2vw",
          height: "13vw",
          marginLeft: "14vw",
          lineHeight: "2",
        }}
        className="borderFooter"
      >
        <div style={{ marginTop: "1vw" }} className="hover">
          <Link
            to="/"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Home
          </Link>
          <br />
          <Link
            to="/workoutPlan"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Workout Plan
          </Link>
          <br />
          <Link
            to="/coaches"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Coaches
          </Link>
          <br />
          <Link
            to="/SignIn"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Login
          </Link>
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px white solid",
          paddingLeft: "2vw",
          height: "13vw",
          marginLeft: "8vw",
          lineHeight: "2",
        }}
        className="borderFooter"
      >
        <div style={{ marginTop: "1vw" }} className="hover">
          <Link
            to="/shop"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Shop
          </Link>
          <br />
          <Link
            to="#"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
            onClick={show}
          >
            Work With Us
          </Link>
          {visible && (
            <WorkWithUsModal
              visible={visible}
              hide={hide}
              animation={"slideUp"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={452}
              width={500}
            />
          )}
          <br />
          <Link
            to="/contactUs"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
              position: "relative",
              top: "2.2vw",
            }}
          >
            Contact us
          </Link>
          <br />
          <Link
            to="/faq"
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
              position: "relative",
              top: "-2.4vw",
            }}
          >
            FAQ
          </Link>
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px white solid",
          paddingLeft: "2vw",
          height: "13vw",
          marginLeft: "8vw",
          lineHeight: "2",
        }}
        className="borderFooter"
      >
        <div style={{ marginTop: "1vw" }} className="hover">
          <Link
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Facebook
          </Link>
          <br />
          <Link
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Instagram
          </Link>
          <br />
          <Link
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            Twitter
          </Link>
          <br />
          <Link
            style={{
              textTransform: "uppercase",
              fontFamily: "Impact, Arial black, sans-serif",
              color: "white",
            }}
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
