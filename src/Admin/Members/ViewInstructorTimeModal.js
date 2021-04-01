import React from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const ViewInstuctorTimeRodal = (props) => {
  console.log(props.date)

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
      <h1 className="Rodal_Title" style={{ textAlign: "center" }}>
        View Reserved Pt
      </h1>
      <form className="addAdmin" style={{ display: "flex" }}>
        <table style={{ width: "90%", marginLeft: "1vw" }}>
          <thead>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Cost</th>
          </thead>
          {props.inst.map((i) => {
            return (
              <tbody key={i.id}>
                <tr>
                  <td style={{ textAlign: "center" }}>{i.name}</td>
                  <td style={{ textAlign: "center" }}>{i.email}</td>
                  <td style={{ textAlign: "center" }}>{i.phone}</td>
                  <td style={{ textAlign: "center" }}>{i.address}</td>
                  <td style={{ textAlign: "center" }}>{i.price + "$"}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <table>
          <thead>
            <th style={{ textAlign: "center" }}>Start Time</th>
            <th style={{ textAlign: "center" }}>End Time</th>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>
                {props.time.map((j) => {
                  return (
                    <>
                      {j.start}
                      <br />
                    </>
                  );
                })}
              </td>
              <td style={{ textAlign: "center" }}>
                {props.time.map((j) => {
                  return (
                    <>
                      {j.end}
                      <br />
                    </>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Rodal>
  );
};

export default ViewInstuctorTimeRodal;
