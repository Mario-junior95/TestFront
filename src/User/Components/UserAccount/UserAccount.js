import React  from "react";
import { Link } from "react-router-dom";
import "./UserAccount.css";

const UserAccount = () => {

  return (
    <div className="block_userAccount">
      <Link exact="true" to="/myinfo">
        My Breaks
      </Link>
      <Link exact="true" to="/myclasses">
        My Classes
      </Link>
      <Link exact="true" to="/merchandise">
        The Merchandise
      </Link>
    </div>
  );
};

export default UserAccount;
