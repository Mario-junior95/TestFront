import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";

import Axios from "axios";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const EditMemberShipType = (props) => {
  const [membershipName, setMembershiName] = useState(props.val.name);
  const [benefits, setBenefits] = useState(props.val.benefits);
  const [date, setDate] = useState(props.val.date);
  const [amount, setAmount] = useState(props.val.amount);

  console.log(props.val);

  const { setRender } = props.render;

  /** error States */

  const [benefitsErr, setBenefitsErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [amountErr, setAmountErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Admin */

  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", membershipName);
    data.append("benefits", benefits);
    data.append("date", date);
    data.append("amount", amount);
    try {
      await Axios.post(
        `http://localhost:8000/api/membership/${props.val.id}?_method=PUT `,
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
          //   console.log(response.data);
          setRender((prev) => !prev);
          setSuccess(`${props.val.name} updated Successfully!!!`);
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setBenefitsErr(error.response.data.errors.benefits);
        setDateErr(error.response.data.errors.date);
        setAmountErr(error.response.data.errors.amount);
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
          Update {props.val.name} Info
        </h1>
        <Grid container spacing={3}>
          <Typography style={{ color: "green", margin: "0 auto" }}>
            {success}
          </Typography>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {benefitsErr}
              </Typography>
              <Typography
                style={{
                  marginRight: "28.5vw",
                  color: "#2196f3",
                  textTransform: "uppercase",
                  fontFamily: "Impact, Arial black, sans-serif",
                }}
              >
                Benefits
              </Typography>
              <Grid item xs={12}>
                <TextareaAutosize
                  rows={10}
                  cols={56}
                  inputRef={inputEl}
                  label="Description"
                  name="description"
                  size="small"
                  variant="outlined"
                  value={benefits}
                  onChange={(e) => {
                    setBenefits(e.target.value);
                    setBenefitsErr("");
                  }}
                />
                <Grid item xs={12}></Grid>
                <Grid item xs={12} style={{ marginTop: "2vw" }}>
                  <Typography style={{ color: "red", margin: "0 auto" }}>
                    {dateErr}
                  </Typography>
                  <TextField
                    label="Duration"
                    name="duration"
                    size="small"
                    variant="outlined"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setDateErr("");
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "2vw" }}>
                  <Typography style={{ color: "red", margin: "0 auto" }}>
                    {amountErr}
                  </Typography>
                  <TextField
                    label="Amount"
                    name="amount"
                    size="small"
                    variant="outlined"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountErr("");
                    }}
                  />
                </Grid>
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
  );
};

export default EditMemberShipType;
