import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import LogoWhite from "../../../Images/logoWhite.svg";
import LogoBlack from "../../../Images/logoBlack.svg";

import "./MyAccountBtn.css";
import './Header.css';

const Header = (props) => {
  const { history } = props;
  // State of our Menu
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
    color: "white",
    hover: false,
  });

  // State of our button
  const [disabled, setDisabled] = useState(false);

  //Use Effect
  useEffect(() => {
    //Listening for page changes.
    history.listen(() => {
      setState({
        clicked: false,
        menuName: "Menu",
        color: "white",
        hover: false,
      });
    });
    return () => {
      setState('');
    }
  }, [history]);

  // Toggle menu
  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close",
        color: "black",
        hover: true,
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu",
        color: "white",
        hover: false,
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close",
        color: "transparent",
        hover: false,
      });
    }
  };

  //Determine if out menu button should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  /* Logout Function */

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
    localStorage.removeItem("membership_id");
    history.push("/");
  };

  return (
    <header className ="headers">
      <div className="container  containers">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
              {state.menuName !== "Close" ? (
                <Link to="/">
                  <img src={LogoWhite} alt="error-logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img src={LogoBlack} alt="error-logo" />
                </Link>
              )}
            </div>
            {state.menuName !== "Close" ? (
              <>
                <div className="menu">
                  <button
                    disabled={disabled}
                    onClick={() => handleMenu()}
                    style={{ color: "white" }}
                  >
                    {state.menuName}
                  </button>
                  <hr style={{ width: "100%", color: "white" }} />
                </div>
              </>
            ) : (
              <>
                <div className="menu">
                  <button
                    disabled={disabled}
                    onClick={() => handleMenu()}
                    style={{ color: "black" }}
                  >
                    {state.menuName}
                  </button>
                  <hr style={{ width: "100%" }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Hamburger state={state} />
      <div className="container_button">
        <div className="center">
          {localStorage.getItem("token") ? (
            <Link exact="true" to="/myinfo">
              <button className="btn">
                <svg
                  width="180px"
                  height="60px"
                  viewBox="0 0 180 60"
                  className="border"
                >
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="bg-line"
                  />
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="hl-line"
                  />
                </svg>
                <span>My Account</span>
              </button>
            </Link>
          ) : (
            <Link exact="true" to="/SignIn">
              <button className="btn">
                <svg
                  width="180px"
                  height="60px"
                  viewBox="0 0 180 60"
                  className="border"
                >
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="bg-line"
                  />
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="hl-line"
                  />
                </svg>
                <span>My Account</span>
              </button>
            </Link>
          )}
        </div>
        <div>
          {localStorage.getItem("token") ? (
            <div className="logout">
              <button className="btn" onClick={() => Logout()}>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
