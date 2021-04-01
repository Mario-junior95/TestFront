import React from "react";
import { Typography } from "@material-ui/core";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewWorkoutRodal = (props) => {
  // console.log(props.val);
  // console.log(props.val.image);
  return (
    <div>
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
            View Workout Info
          </h1>
          <img src={`http://localhost:8000/storage/${props.val.image}`} style={{ width: '50%',
    margin: '0 21%'}} alt="error_workout_img" />
          <Typography style={{ textAlign: "center" }}>
            {props.val.description}
          </Typography>
        </form>
      </Rodal>
    </div>
  );
};

export default ViewWorkoutRodal;
