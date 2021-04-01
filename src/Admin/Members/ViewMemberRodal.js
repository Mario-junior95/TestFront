import React, { useState } from "react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import { TableCell } from "@material-ui/core";

import ViewMemberShipRodal from "./ViewMemberShipRodal";

import ViewBuyItemsRodal from "./ViewBuyItemsRodal";

const ViewMemberRodal = (props) => {
  const [visibleMembership, setVisibleMembership] = useState(false);
  const [visibleShop, setVisibleShop] = useState(false);
  const [listMembership, setListMembership] = useState([]);
  const [userInstructor, setUserInstructor] = useState([]);
  const [userTime, setUserTime] = useState([]);

  const [buyItemUser , setBuyItemUser] = useState([]);

  const showMembership = () => {
    setVisibleMembership(true);
  };

  const hideMembership = () => {
    setVisibleMembership(false);
  };

  const showShop = () => {
    setVisibleShop(true);
  };

  const hideShop = () => {
    setVisibleShop(false);
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
          View Member Info
        </h1>
        <p style={{ textAlign: "center" }}>
          <strong> First Name : </strong>
          {props.val.firstname}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Last Name : </strong>
          {props.val.lastname}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Email : </strong>
          {props.val.email}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Phone : </strong>
          {props.val.phone}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Address : </strong>
          {props.val.address}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong> Gender : </strong>
          {props.val.gender}
        </p>
        <div style={{marginLeft:"4.3vw"}}>
        <TableCell align="right">
          <input
            type="submit"
            value="MemberShip Type"
            className="view"
            onClick={(e) => {
              e.preventDefault();
              showMembership();
              setListMembership(props.val.membership);
              setUserInstructor(props.val.user_instructor);
              setUserTime(props.val.user_time);
            }}
          />
        </TableCell>
        <TableCell align="right">
          <input
            type="submit"
            value="View Buy Items"
            className="view"
            
            onClick={(e) => {
              e.preventDefault();
              showShop();
              setBuyItemUser(props.val.id)
            }}
          />
        </TableCell>
        </div>
      </form>
      {visibleMembership && (
        <ViewMemberShipRodal
          visible={visibleMembership}
          hide={hideMembership}
          animation={"slideLeft"}
          duration={500}
          closeMaskOnClick={true}
          closeOnEsc={true}
          height={450}
          width={500}
          show={showMembership}
          val={listMembership}
          inst={userInstructor}
          time={userTime}
        />
      )}{" "}
       {visibleShop && (
        <ViewBuyItemsRodal
          visible={visibleShop}
          hide={hideShop}
          animation={"slideRight"}
          duration={500}
          closeMaskOnClick={true}
          closeOnEsc={true}
          height={450}
          width={500}
          show={showShop}
          val={buyItemUser}
        />
      )}{" "}
    </Rodal>
  );
};

export default ViewMemberRodal;
