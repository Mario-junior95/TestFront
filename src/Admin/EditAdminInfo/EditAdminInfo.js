import React, { useState, inputEl, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Axios from "axios";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const EditAdminInfo = (props) => {
  const [render, setRender] = useState(false);

  useEffect(async () => {
    await Axios.get(
      `http://localhost:8000/api/admin/${localStorage.getItem("idAdmin")}`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
        },
      }
    ).then((response) => {
      if (
        response.data.status === "Token is Expired" ||
        response.data.status === "Token is Invalid" ||
        response.data.status === "Authorization Token not found"
      ) {
        expireToken();
        return window.location.reload();
      } else {
        console.log(response.data.admin);
        setLastName(response.data.admin.lastname);
        setFirstName(response.data.admin.firstname);
        setUserName(response.data.admin.username);
        setEmail(response.data.admin.email);
      }
    });
  }, [render]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  /** error States */

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Admin */

  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("username", userName);
    data.append("email", email);
    try {
      await Axios.post(
        `http://localhost:8000/api/admin/${localStorage.getItem(
          "idAdmin"
        )}?_method=PUT `,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("tokens"),
          },
        }
      ).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else {
          console.log(response.data);
          setRender((prev) => !prev);
          setSuccess("Admin Updated Successfully!!!");
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setFirstNameErr(error.response.data.errors.firstname);
        setLastNameErr(error.response.data.errors.lastname);
        setUserNameErr(error.response.data.errors.username);
        setEmailErr(error.response.data.errors.email);
      }
    }
  };

  return (
    <div>
      <Rodal
        visible={props.visible}
        onClose={success ? close : props.hide}
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
            Update Admin Info
          </h1>
          <Grid container spacing={3}>
            <Typography style={{ color: "green", margin: "0 auto" }}>
              {success}
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={2}>
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
                onClick={updateInfo}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Rodal>
    </div>
  );
};

export default EditAdminInfo;
