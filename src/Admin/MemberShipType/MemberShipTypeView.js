import React from "react";


import Rodal from "rodal";
import "rodal/lib/rodal.css";

const MemberShipTypeView = (props) => {
  console.log(props.val);
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
          View MemberShip Type Info
        </h1>
        <h2 style={{ textAlign: "center" }}>{props.val.name}</h2>
        <p style={{ textAlign: "center" }}>{props.val.benefits}</p>
        <p style={{ textAlign: "center" }}>
          {"duration : "}
          {props.val.date}
        </p>
        <p style={{ textAlign: "center" }}>
          {"Amount : "}
          {props.val.amount}
          {"$"}
        </p>
      </form>
    </Rodal>
  );
};

export default MemberShipTypeView;
