import React, { useEffect, useState } from "react";
import Header from "../Navigation/Header";
import UserAccount from "../UserAccount/UserAccount";

import Axios from "axios";

const TheMerchandise = () => {
  const [listShop, setListShop] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/shop").then((response) => {
      setListShop(response.data.shop);
      console.log(response.data.shop);
    });
  }, []);

  return (
    <div className="LoginSection">
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="home">
            <div>
              <UserAccount />
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th> Type</th>
                    <th>Price</th>
                  </tr>
                </thead>
                {listShop.map((val) => {
                  return (
                    <tbody key={val.id}>
                      {val.user_id == localStorage.getItem("idUser") && (
                        <tr>
                          <td>{val.name}</td>
                          <td>{val.type}</td>
                          <td>{val.amount + "$"}</td>
                        </tr>
                      )}
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheMerchandise;
