import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Header from "../Navigation/Header";
import "../../../App.css";
import Tilt from "react-parallax-tilt";
import "./Shop.css";
import Axios from "axios";
import Pagination from "../../../Paginate/Paginate";
import { css } from "glamor";

import Footer from "../Footer/Footer";

import Loading from "../../../Loading/Loading";

const Shop = () => {
  const [listShop, setListShop] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/item").then((response) => {
      setListShop(response.data.item);
    });
  }, []);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const history = useHistory();

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [image, setImage] = useState("null");

  const [noToken, setNoToken] = useState("");
  const redirectWithouToken = () => {
    setNoToken("SignIn Before Buying any Item");
    setTimeout(() => {
      history.push("/SignIn");
    }, 3000);
  };

  useEffect(() => {
    setFilteredData(
      listShop.filter(
        (shop) =>
          shop.type.toLowerCase().includes(search.toLowerCase()) ||
          shop.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listShop]);

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let card = css({
    ".card": {
      position: "relative",
      float: "center",
      width: "auto !important",
      height: "auto !important",
      marginRight: "80px",
      borderRadius: " 30px",
      background: "rgb(222, 222, 222) !important",
      background:
        "linear-gradient(182deg, white 0%, white 100%) rgb(222, 222, 222) !important",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
      transformStyle: "preserve-3d",
      transform: " perspective(500px)",
      marginTop: "10vw",
      marginBottom: "5vw",
    },
  });

  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="container">
            <div className="wrapper">
              <div className="shop">
                <h1
                  style={{
                    fontSize: " 5vw",
                    marginLeft: "-55vw ",
                    marginTop: "7vw",
                  }}
                >
                  Shop
                </h1>
                {filteredData.length === 0 ? (
                  <label>
                    <input
                      type="text"
                      value={search}
                      style={{ borderBottom: "1px red solid" }}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="Search By Name Or By Type"
                    />
                    <div className="label-text" style={{ color: "red" }}>
                      Search{" "}
                    </div>
                  </label>
                ) : (
                  <label>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="Search By Name Or By Type"
                    />
                    <div className="label-text">Search </div>
                  </label>
                )}
                <p style={{ color: "red" }}>{noToken}</p>
                <div
                  className="items"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr ",
                    padding: "0 0 4vw  0",
                  }}
                >
                  {filteredData.length === 0 ? (
                    <p
                      style={{
                        color: "red",
                        marginLeft: "39vw",
                        width: "16vw",
                      }}
                    >
                      No Result Found
                    </p>
                  ) : (
                    <>
                      {currentPosts.map((val) => {
                        /** Add Item   */

                        const handleAdd = async (e) => {
                          e.preventDefault();
                          const data = new FormData();
                          data.append("name", val.name);
                          data.append("image", image);
                          data.append("amount", val.amount);
                          data.append("type", val.type);
                          data.append(
                            "user_id",
                            localStorage.getItem("idUser")
                          );

                          try {
                            await Axios.post(
                              "http://localhost:8000/api/shop",
                              data,
                              {
                                headers: {
                                  "content-type": "multipart/form-data",
                                  Authorization:
                                    "Bearer " + localStorage.getItem("token"),
                                },
                              }
                            ).then((response) => {
                              if (
                                response.data.status === "Token is Expired" ||
                                response.data.status === "Token is Invalid" ||
                                response.data.status ===
                                  "Authorization Token not found"
                              ) {
                                expireToken();
                                return window.location.reload();
                              } else {
                                setTimeout(() => {
                                  history.push("/payment");
                                }, 2500);
                              }
                            });
                          } catch (error) {
                            if (error.response) {
                              console.log(error);
                            }
                          }
                        };
                        return (
                          <Tilt key={val.id}>
                            <div className="page-index ">
                              <div className="card " {...card}>
                                <img
                                  className="shoe"
                                  src={`http://localhost:8000/storage/${val.image}`}
                                />
                                <div className="content_item">
                                  <p
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    {val.name}
                                  </p>
                                  <p
                                    style={{
                                      color: "black",
                                      textAlign: "center",
                                    }}
                                  >
                                    <strong> Price :</strong> {val.amount + "$"}
                                  </p>
                                  <p
                                    style={{
                                      color: "black",
                                      textAlign: "center",
                                    }}
                                  >
                                    <strong> Type :</strong> {val.type}
                                  </p>
                                  {localStorage.getItem("token") ? (
                                    <button
                                      className="button_shop"
                                      onClick={handleAdd}
                                    >
                                      Buy
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        className="button_shop"
                                        onClick={redirectWithouToken}
                                      >
                                        Buy
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Tilt>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              {filteredData.length !== 0 && (
                <Pagination
                  paginate={paginate}
                  postsPerPage={postsPerPage}
                  totalPosts={listShop.length}
                />
              )}
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

export default Shop;
