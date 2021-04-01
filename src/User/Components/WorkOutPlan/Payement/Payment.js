import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Navigation/Header";
import Axios from "axios";
import "./Payement.css";
import VanillaTilt from "vanilla-tilt";
import CreditCardLogo from "../../../../Images/creditcard.png";

import Footer from "../../Footer/Footer";

import Loading from "../../../../Loading/Loading";

const Payment = () => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 30,
      speed: 400,
      glare: true,
      "max-glare": 1,
    });
  }, []);

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  const [cardnumber, setCardNumber] = useState("");

  const history = useHistory();

  const routeChange = () => {
    let path = `/myclasses`;
    history.push(path);
  };

  const AddPayment = async (e) => {
    const data = new FormData();
    data.append("card_number", cardnumber);
    data.append("user_id", localStorage.getItem("idUser"));
    data.append("date", localStorage.getItem("date"));
    data.append("amount", 0);
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8000/api/payement", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        routeChange();
        // console.log(response.data.);
        // window.location.reload(true);
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="blockCard">
            <div className="card">
              <div className="content">
                <h2>CREDIT CARD</h2>
                <h3>
                  <img
                    src={CreditCardLogo}
                    style={{ width: "4vw" }}
                    alt="credit_card_logo_error"
                  />
                  {localStorage.getItem("firstname")}{" "}
                  {localStorage.getItem("lastname")}
                </h3>
                <label
                  style={{
                    paddingTop: " 30px",
                    position: "absolute",
                    top: "7vw",
                    left: "-7vw",
                  }}
                >
                  <input
                    type="text"
                    placeholder="enter your card-number"
                    style={{ marginLeft: "-5vw" }}
                    value={cardnumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <button className="btnLogin" onClick={AddPayment}>
                    Save
                  </button>
                </label>
              </div>
            </div>
            <div className="cardInfo" style={{ marginTop: "18vw" }}>
              <h2 style={{ color: "red" }}>
                Please hover the card to edit your card number
              </h2>
              <p style={{ color: "white" }}>
                Email : {localStorage.getItem("email")}
              </p>
              <p style={{ color: "white" }}>
                Address : {localStorage.getItem("address")}{" "}
              </p>
              <p style={{ color: "white" }}>
                Phone Number : {localStorage.getItem("phone")}
              </p>
            </div>
          </div>
          <div style={{ marginTop: "-7vw" }}>
            <Footer />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Payment;
