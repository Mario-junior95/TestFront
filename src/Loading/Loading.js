import React from "react";
import "../Loading/Loading.scss";

const Loading = () => {
  return (
    <div className="loading wave" style={{   position:"relative",
    top:'20vw'}}>
      <span
        style={{
          textTransform: "uppercase",
          fontFamily: "Impact, Arial black, sans-serif",
        }}
        className="loading_stroke"
      >
        Loading
      </span>
    </div>
  );
};

export default Loading;
