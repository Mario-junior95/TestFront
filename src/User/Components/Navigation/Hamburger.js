import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { css } from "glamor";
import Home from "../../../Images/Home.jpg";
import WorkPlan from "../../../Images/Workout.jpg";
import Coaches from "../../../Images/Coaches.jpg";

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  staggerRevealClose,
} from "./Animations";

const Hamburger = (props) => {
  const { state } = props;
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
    return () => {};
  }, [state]);

  //Change image  on Hover

  // make css rules
  let hoverOne = css({
    ":hover": {
      backgroundImage: `url(${Home})`,
      position: "fixed",
      left: "0px",
      height: "100vh",
      top: "0px",
      backgroundSize: " 93.4%",
      width: "99vw",
    },
  });

  let hoverTwo = css({
    ":hover": {
      backgroundImage: `url(${WorkPlan})`,
      position: "fixed",
      left: "0px",
      height: "100vh",
      top: "0px",
      backgroundSize: " 93.4%",
      width: "99vw",
    },
  });

  let hoverThree = css({
    ":hover": {
      backgroundImage: `url(${Coaches})`,
      position: "fixed",
      left: "0px",
      height: "100vh",
      top: "0px",
      backgroundSize: " 93.4%",
      width: "99vw",
    },
  });

  const [listOne, setListOne] = useState("");

  /*    Logout Function */
  const Logout = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("phone");
    localStorage.removeItem("date");
    localStorage.removeItem("gender");
    localStorage.removeItem("address");
  };

  return (
    <div ref={(el) => (menuLayer = el)} className="hamburger-menu">
      <div
        ref={(el) => (reveal1 = el)}
        className="menu-secondary-background-color"
      ></div>
      <div ref={(el) => (reveal2 = el)} className="menu-layer">
        <div className="container">
          <div className="wrapper" {...listOne}>
            <div className="menu-links">
              <nav>
                <ul>
                  <li className="listLink1">
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line1 = el)}
                      to="/"
                      onMouseOver={() => setListOne({ ...hoverOne })}
                      onMouseLeave={() => setListOne({})}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line2 = el)}
                      to="/workoutPlan"
                      onMouseOver={() => setListOne({ ...hoverTwo })}
                      onMouseLeave={() => setListOne({})}
                    >
                      Workout Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line3 = el)}
                      to="/coaches"
                      onMouseOver={() => setListOne({ ...hoverThree })}
                      onMouseLeave={() => setListOne({})}
                    >
                      Coaches
                    </Link>
                  </li>
                </ul>
                <ul className="special_font">
                  {!localStorage.getItem("token") ? (
                    <li>
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        to="/SignIn"
                        className="MiniMenu"
                      >
                        Login
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        to="/"
                        onClick={() => Logout()}
                      >
                        Logout
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line3 = el)}
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line3 = el)}
                      to="/contactUs"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => handleHover(e)}
                      onMouseOut={(e) => handleHoverExit(e)}
                      ref={(el) => (line3 = el)}
                      to="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>

              <div ref={(el) => (info = el)} className="copyright">
                CopyRight Ⓒ 2021 .<br />{" "}
                <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                  {" "}
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
                </span>{" "}
                <br />
                All Rights Reserved
              </div>
              <div ref={(el) => (info = el)} className="info"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
