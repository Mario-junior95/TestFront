import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Coaches.css";
import Header from "../Navigation/Header";
import Axios from "axios";

import Footer from "../Footer/Footer";

import "./Modal.css";
import $ from "jquery";
import ModalCoaches from "./ModalCoaches";
import Loading from "../../../Loading/Loading";

import AOS from "aos";
import "aos/dist/aos.css";

const Coaches = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
    AOS.refresh();
  }, []);

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  const [render, setRender] = useState(false);
  const [listInstructor, setListInstructor] = useState([]);

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/instructor").then((response) => {
      setListInstructor(response.data.instructor);
      console.log(response.data.instructor);
    });
  }, [render]);

  /**   JQuery Effect */

  $(".btn").click(function () {
    $("#modal").removeAttr("class").addClass("five");
  });

  $(".close").click(function () {
    $("#modal").addClass("out");
  });

  const [list, setList] = useState([]);
  const [warning, setWarning] = useState("");
  const [link, setLink] = useState("/coaches");
  const [namePt, setNamePt] = useState("");

  const warningWithTimeOut = () => {
    setWarning(
      `You should Login and pick a class before booking with ${namePt}`
    );
  };

  const history = useHistory();

  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="container">
            <div className="wrapper">
              <div className="home">
                <div className="containers" style={{ marginBottom: "3vw" }}>
                  <div className="Coaches_banner"></div>
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: " 46px",
                      fontSize: "1.32em",
                    }}
                  >
                    {warning}
                  </p>
                  <div
                    style={{
                      marginBottom: "6vw",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="containerCoaches"
                  >
                    {listInstructor.map((val, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div
                            className="sectionCoaches"
                            key={val.id}
                            style={{ display: "flex", marginLeft: "6vw" }}
                          >
                            <img
                              data-aos="fade-zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay="400"
                              data-aos-offset="0"
                              src={`http://localhost:8000/storage/${val.image}`}
                              alt="error_coach_image"
                              style={{ width: "45vw", margin: "20px" }}
                            />
                            <div className="coachInfo">
                              <p className="coachTitle">
                                <strong>
                                  {"Know more about the role of "}
                                  {val.name}
                                </strong>
                              </p>
                              <p>{val.description}</p>
                              <p
                              className="coachPrice"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                              <span  className="coachPrice"> {val.price + "$ /hr"}</span>
                              </p>
                              <div>
                                {localStorage.getItem("token") ? (
                                  <div className="btn-wrap">
                                    <a href="#modals" className="btn">
                                      <button
                                        className="btnLogin"
                                        style={{ padding: "13px 0vw" }}
                                        onClick={() => {
                                          setList(val);
                                        }}
                                      >
                                        Book With {val.name}
                                      </button>
                                    </a>
                                  </div>
                                ) : (
                                  <Link to={link}>
                                    <a
                                      href="#warning"
                                      style={{ visibility: "hidden" }}
                                    ></a>
                                    <button
                                      className="btnLogin"
                                      style={{
                                        padding: "13px 0vw",

                                        boxShadow:
                                          " 0 2px 10px 0 rgba(95, 186, 233, 0.3)",
                                      }}
                                      onClick={() => {
                                        setNamePt(val.name);
                                        warningWithTimeOut();
                                        setTimeout(() => {
                                          history.push("/SignIn");
                                        }, 4000);
                                      }}
                                    >
                                      Book With {val.name}
                                    </button>
                                  </Link>
                                )}
                                <ModalCoaches val={list} />
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={val.id}
                            className="sectionCoaches"
                            style={{
                              float: "right",
                              display: "flex",
                              marginTop: "3vw",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <img
                              src={`http://localhost:8000/storage/${val.image}`}
                              alt="error_coach_image"
                              style={{ width: "45vw", margin: "20px" }}
                              data-aos="fade-zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay="400"
                              data-aos-offset="0"
                            />
                            <div className="coachInfo">
                              <p className="coachTitle">
                                <strong>
                                  {"Know more about the role of "}
                                  {val.name}
                                </strong>
                              </p>
                              <p>{val.description}</p>
                              <p
                               
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                               <span  className="coachPrice"> {val.price + "$ /hr"}</span>
                              </p>
                              <div>
                                {localStorage.getItem("token") ? (
                                  <div className="btn-wrap">
                                    <a href="#modals" className="btn">
                                      <button
                                        className="btnLogin"
                                        style={{ padding: "13px 0vw" }}
                                        onClick={() => {
                                          setList(val);
                                        }}
                                      >
                                        Book With {val.name}
                                      </button>
                                    </a>
                                  </div>
                                ) : (
                                  <Link to={link}>
                                    <button
                                      className="btnLogin"
                                      style={{
                                        padding: "13px 0vw",
                                        boxShadow:
                                          " 0 2px 10px 0 rgba(95, 186, 233, 0.3)",
                                      }}
                                      onClick={() => {
                                        warningWithTimeOut();
                                        setNamePt(val.name);
                                        setTimeout(() => {
                                          history.push("/SignIn");
                                        }, 4000);
                                      }}
                                    >
                                      Book With {val.name}
                                    </button>
                                  </Link>
                                )}
                                <ModalCoaches val={list} />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
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

export default Coaches;
