import React, { useState, useEffect } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import Axios from "axios";

import ViewInstuctorTimeRodal from "./ViewInstructorTimeModal";
import { TableCell } from "@material-ui/core";

const ViewBuyItemsRodal = (props) => {
  const [visibleInstructor, setVisibleInstructor] = useState(false);

  const showInstructor = () => {
    setVisibleInstructor(true);
  };

  const hideInstructor = () => {
    setVisibleInstructor(false);
  };

  const [listShop, setListShop] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/shop").then((response) => {
      setListShop(response.data.shop);
      // console.log(response.data.shop);
    });
  }, []);

  return (
    <Rodal
      visible={props.visible}
      onClose={props.hide}
      animation={props.animation}
      duration={props.duration}
      closeMaskOnClick={props.closeMaskOnClick}
      closeOnEsc={props.closeOnEsc}
      height={props.height}
      width={props.width}
      show={props.show}
    >
      <form className="addAdmin">
        <h1 className="Rodal_Title" style={{ textAlign: "center" }}>
          View Khaldoun Items
        </h1>
        <table
          style={{
            borderCollapse: "collapse",
            width: "83%",
            marginTop: "3vw",
            marginLeft: "4vw",
          }}
        >
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
                {val.user_id == props.val && (
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
      </form>
    </Rodal>
  );
};

export default ViewBuyItemsRodal;
