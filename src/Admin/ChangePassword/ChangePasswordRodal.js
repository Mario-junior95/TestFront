import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Button, Grid, TextField , Typography } from "@material-ui/core";

import Axios from "axios";

const ChangePasswordRodal = (props) => {
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [passErr, setPassErr] = useState("");

  const [success, setSuccess] = useState("");
  const [close, setClose] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact = "true" to="/Admin-Login" />;
  };

  const ChangePassword = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("password", password);

    try {
      await Axios.post(
        `http://localhost:8000/api/updatePassword/${localStorage.getItem(
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
          if (password === confrimPassword) {
            localStorage.getItem("tokens");
            console.log(response.data);
            setSuccess("Password Changed Successfully!!!");
            setTimeout(() => {
              setClose(props.hide);
            }, 2300);
          } else {
            setPassErr("Password confirmation does not match");
          }
        }
      });
    } catch (error) {
      if (error.response) {
        setPassErr(error.response.data.errors.password);
        console.clear();
      } else if (error.request) {
        console.error(error.request.data.errors);
      } else {
        console.error("Error", error.message.data.errors);
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
      closeOnEsc={props.closeOnEsc}
      height={props.height}
      width={props.width}
      show={props.show}
    >
      <form className="addAdmin">
        <h1 className="Rodal_Title" style={{ textAlign: "center" }}>
          Change Your current Password
        </h1>
        <Grid container spacing={3}>
          <Typography style={{ color: "green", margin: "0 auto" }}>{success}</Typography>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", margin: "0 auto" }}>{passErr}</Typography>
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
                    setPassErr("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="password"
                  size="small"
                  variant="outlined"
                  type="password"
                  value={confrimPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPassErr("");
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
              onClick={ChangePassword}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Rodal>
  );
};

export default ChangePasswordRodal;
