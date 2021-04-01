import React from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewFaqRodal = (props) => {
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
          View Faq Info
        </h1>
        <p style={{ textAlign: "center" }}>
          <strong> Question : </strong>
          <br />
          {props.val.question}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Answer : </strong>
          <br />
          {props.val.answer}
        </p>
      </form>
    </Rodal>
  );
};

export default ViewFaqRodal;
