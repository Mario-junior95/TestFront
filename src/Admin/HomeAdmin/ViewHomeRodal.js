import React from "react";
import { Typography } from "@material-ui/core";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewHomeRodal = (props) => {
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
            View {props.val.title} Info
          </h1>

          <video
            style={{ width: "50%", height: "17vw", margin: "0 21%" }}
            loop
            autoPlay
          >
            <source
              src={`http://localhost:8000/storage/${props.val.image}`}
              type="video/mp4"
            />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <Typography style={{ textAlign: "center" }}>
            {props.val.description}
          </Typography>
        </form>
      </Rodal>
    </div>
  );
};

export default ViewHomeRodal;
