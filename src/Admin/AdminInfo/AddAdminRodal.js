import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./AdminInfo.css";
import Axios from "axios";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

const AddAdminRodal = (props) => {
  const { setRender } = props.render;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [listAdmin, setListAdmin] = useState([]);

  /** error States */

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setFirstNameErr("");
    setLastNameErr("");
    setUserNameErr("");
    setPasswordErr("");
    setEmailErr("");
  };

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /**   Create Admin */

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("username", userName);
    data.append("password", password);
    try {
      await Axios.post("http://localhost:8000/api/admin", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("superAdminToken"),
        },
      }).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else {
          setListAdmin(response.data.admin);
          setRender((prev) => !prev);
          setSuccess("Admin Added Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setFirstNameErr(error.response.data.errors.firstname);
        setLastNameErr(error.response.data.errors.lastname);
        setUserNameErr(error.response.data.errors.username);
        setPasswordErr(error.response.data.errors.password);
        setEmailErr(error.response.data.errors.email);
      }
    }
  };

  return (
    <Rodal
      visible={props.visible}
      onClose={success ? close : props.hide}
      animation={props.animation}
      duration={props.duration}
      closeMaskOnClick={props.closeMaskOnClick}
      closeOnEsc={props.closeMaskOnClick}
      height={props.height}
      width={props.width}
    >
      <form className="addAdmin">
        <h1 className="Rodal_Title">Add New Admin</h1>
        <Grid container spacing={3}>
          <Typography style={{ color: "green", margin: "0 auto" }}>
            {success}
          </Typography>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {firstNameErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Firstname"
                  name="firstname"
                  size="small"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {lastNameErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lastname"
                  name="lastname"
                  size="small"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLastNameErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {emailErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {userNameErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={inputEl}
                  label="Username"
                  name="username"
                  size="small"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setUserNameErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {passwordErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErr("");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleAdd}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Rodal>
  );
};

export default AddAdminRodal;
