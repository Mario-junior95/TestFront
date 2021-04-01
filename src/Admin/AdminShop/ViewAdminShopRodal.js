import React from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewAdminShopRodal = (props) => {
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
          View Item Info
        </h1>
        <img
          src={`http://localhost:8000/storage/${props.val.image}`}
          style={{ width: "20%", margin: "0 40%" }}
          alt="error_instructor_img"
        />
        <p style={{ textAlign: "center" }}>
          <strong> Name : </strong>
          <br />
          {props.val.name}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Type : </strong>
          <br />
          {props.val.type}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Price : </strong>
          <br />
          {props.val.amount + "$"}
        </p>
      </form>
    </Rodal>
  );
};

export default ViewAdminShopRodal;
