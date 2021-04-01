import React from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewWorkWithUsRodal = (props) => {
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
          View Message Info
        </h1>
        <a
          href={`http://localhost:8000/storage/${props.val.image}`}
          target="_blank"
          style={{ marginLeft: "17.6vw", color: "black" }}
        >
          Download CV
        </a>
        <p style={{ textAlign: "center" }}>
          <strong> Email : </strong>
          {props.val.email}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Message : </strong>
          <br />
          {props.val.description}
        </p>
      </form>
    </Rodal>
  );
};

export default ViewWorkWithUsRodal;
