import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Home.css";
import Header from "../Navigation/Header";
import Axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "../Footer/Footer";

import Loading from "../../../Loading/Loading";

// import "../Navigation/Header.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
    AOS.refresh();
  }, []);

  const [render, setRender] = useState(false);

  const [listHome, setListHome] = useState([]);

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/home", {
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
        setListHome(response.data.home);
      }
    });
  }, [render]);
  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="container">
            <div className="wrapper">
              <div className="home">
                <div className="containers">
                  <div className="Home_banner"></div>
                  <div>
                    <h1
                      className="home_title"
                      data-aos="fadeLeft"
                      data-aos-easing="ease-in-out"
                    >
                      YOU WANT IT. WE’VE GOT IT.
                    </h1>
                    <p
                      style={{
                        textAlign: "center",
                        margin: "0 auto",
                        width: "80%",
                      }}
                      className = "par_home"
                      data-aos="fadeLeft"
                      data-aos-easing="ease-in-out"
                    >
                      What started out as a single gym filled with homemade
                      equipment has grown into a global brand on the cutting
                      edge of fitness.{" "}
                      <span className="home_paragraph_top">Point Break</span>{" "}
                      aims to give its members the very best: from modern
                      equipment, to a clean and welcoming atmosphere with an
                      expert staff. Amenities vary by location, but often
                      include superior strength equipment, tons of cardio with
                      TVs, group classes such as spin, yoga, kickboxing, and
                      boot camp, personal training and nutritional counseling,
                      and much more. In addition, many locations feature
                      basketball and tennis courts, swimming pools, mixed
                      martial arts. studios, saunas, and more. Whether you're a
                      weekend warrior or a pro athlete, we are the ultimate
                      fitness destination. We're also excited to announce the
                      launch of{" "}
                      <span className="home_paragraph_top">Point Break</span>{" "}
                      Athletics, our exclusive, studio-style, small group
                      training program that combines the best of HIIT, Olympic
                      Lifting and functional training. World Gym Athletics is
                      available now at select gyms.
                    </p>
                  </div>
                  <hr
                    data-aos="fadeLeft"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="50"
                    className = "horiz_home"
                    style={{
                      width: "60vw",
                      borderRadius: "100%",
                      height: "2px",
                      marginTop: " 2vw",
                      marginBottom: "2vw",
                    }}
                  />
                  <div
                    style={{
                      marginBottom: "6vw",
                      marginTop: "2vw",
                      flexDirection: "column",
                      display: "flex",
                    }}
                    className="containerCoaches"
                  >
                    {listHome.map((val, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div
                            key={val.id}
                            className = "section_home"
                            style={{
                              display: "flex",
                              marginLeft: "6vw",
                            }}
                          >
                            <video
                              style={{
                                width: "45vw",
                                height: "27vw",
                                margin: "20px",
                                position: "relative",
                                left: "-5vw",
                              }}
                              loop
                              autoPlay
                              data-aos="fade-zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay="400"
                              data-aos-offset="0"
                            >
                              <source
                                src={`http://localhost:8000/storage/${val.image}`}
                                type="video/mp4"
                              />
                              <source src="movie.ogg" type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>

                            <div
                              className="coachInfo"
                              style={{ paddingTop: "3vw" }}
                              data-aos="fade-down"
                              data-aos-anchor-placement="top-center"
                            >
                              <h1>
                                <strong>{val.title}</strong>
                              </h1>
                              <p>{val.description}</p>
                              <div>
                                <div className="btn-wrap">
                                  <Link to="/workoutPlan">
                                    <button
                                      className="btnLogin"
                                      style={{
                                        padding: "13px 4vw",
                                        boxShadow:
                                          " 0 2px 10px 0 rgba(95, 186, 233, 0.3)",
                                      }}
                                    >
                                      Know More
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={val.id}
                            style={{
                              float: "right",
                              display: "flex",
                              marginTop: "3vw",
                              flexDirection: "row-reverse",
                              marginBottom: "3vw",
                            }}
                            className = "section_home section_home_right"
                          >
                            <video
                              style={{
                                width: "45vw",
                                margin: "20px",
                                height: "33vw",
                                position: "relative",
                                left: "4vw",
                              }}
                             
                              loop
                              autoPlay
                              data-aos="fade-zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay="400"
                              data-aos-offset="0"
                            >
                              <source
                                src={`http://localhost:8000/storage/${val.image}`}
                                type="video/mp4"
                              />
                              <source src="movie.ogg" type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                            <div
                              className="coachInfo"
                              data-aos="fade-up"
                              data-aos-anchor-placement="top-center"
                              style={{ marginTop: "2vw", paddingTop: "3vw" }}
                            >
                              <h1>
                                <strong>{val.title}</strong>
                              </h1>
                              <p>{val.description}</p>
                              <div>
                                <div className="btn-wrap">
                                  <Link to="/workoutPlan">
                                    <button
                                      className="btnLogin"
                                      style={{
                                        padding: "13px 4vw",
                                        boxShadow:
                                          " 0 2px 10px 0 rgba(95, 186, 233, 0.3)",
                                      }}
                                    >
                                      Know More
                                    </button>
                                  </Link>
                                </div>
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

export default Home;
