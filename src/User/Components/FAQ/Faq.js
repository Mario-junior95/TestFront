import React, { useState, useEffect } from "react";
import Header from "../Navigation/Header";

import Footer from "../Footer/Footer";
import Collapse from "rc-collapse";
import "./Faq.css";

import Axios from "axios";

import Loading from "../../../Loading/Loading";

let Panel = Collapse.Panel;

const Faq = () => {
  const [listFaq, setListFaq] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/faq").then((response) => {
      setListFaq(response.data.faq);
    });
  }, []);

  /**   For Loading */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4550);
  }, []);

  return (
    <>
      {loading === false ? (
        <div className="App">
          <Header />
          <div className="container">
            <div className="wrapper">
              <div className="home">
                <div
                className = "faqTop"
                  style={{
                    marginTop: "4vw",
                    marginBottom: "4vw",
                    width: " 64vw",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1>
                    <span style={{ fontSize: "6vw" }}>FREQUENTLY</span>
                    <br />
                    <span style={{ fontSize: "4vw" }}>
                      ASKED<sub style={{ fontSize: "2vw" }}>QUESTIONS</sub>
                    </span>
                    <br />
                  </h1>
                  <Collapse
                    accordion={true}
                    destroyInactivePanel={true}
                    defaultActiveKey={1}
                  >
                    {listFaq.map((val) => {
                      return (
                        <Panel
                          key={val.id}
                          header={val.question}
                          headerClass="my-header-class"
                          className="reviews_reviews"
                        >
                          {val.answer}
                        </Panel>
                      );
                    })}
                  </Collapse>
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

export default Faq;
