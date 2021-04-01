import React, { useState } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import ViewInstuctorTimeRodal from "./ViewInstructorTimeModal";
import { TableCell } from "@material-ui/core";

const ViewMemberShipRodal = (props) => {
  const [visibleInstructor, setVisibleInstructor] = useState(false);

  const showInstructor = () => {
    setVisibleInstructor(true);
  };

  const hideInstructor = () => {
    setVisibleInstructor(false);
  };

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
          View Membership Type Info
        </h1>
        {props.val.map((i) => {
          return (
            <table key={i.id} style={{ width: "87%", marginLeft: "3vw" }}>
              <thead>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </thead>
              <tbody>
                <tr>
                  <td>{i.name}</td>
                  <td>{i.amount + "$"}</td>
                  <td>{i.date}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
        <TableCell align="center">
          <input
            type="submit"
            style={{ margin: "0 12vw" }}
            value="Reseved PT"
            className="view"
            onClick={(e) => {
              e.preventDefault();
              showInstructor();
            }}
          />
        </TableCell>
      </form>

      {visibleInstructor && (
        <ViewInstuctorTimeRodal
          visible={visibleInstructor}
          hide={hideInstructor}
          animation={"slideLeft"}
          duration={500}
          closeMaskOnClick={true}
          closeOnEsc={true}
          height={450}
          width={900}
          show={showInstructor}
          inst={props.inst}
          time={props.time}
        />
      )}
    </Rodal>
  );
};

export default ViewMemberShipRodal;
