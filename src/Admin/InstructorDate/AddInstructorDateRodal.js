import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../AdminInfo/AdminInfo.css";
import Axios from "axios";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

const AddInstructorDateRodal = (props) => {
  const { setRender } = props.render;

  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [listTime, setListTime] = useState([]);

  /** error States */

  const [timeStartErr, setTimeStartErr] = useState("");
  const [timeEndErr, setTimeEndErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setTimeStart("");
    setTimeEnd("");
    setTimeStartErr("");
    setTimeEndErr("");
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
    data.append("start", timeStart);
    data.append("end", timeEnd);

    try {
      await Axios.post("http://localhost:8000/api/time", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("tokens"),
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
          setListTime(response.data.time);
          setRender((prev) => !prev);
          setSuccess("Time Added Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setTimeStartErr(error.response.data.errors.start);
        setTimeEndErr(error.response.data.errors.end);
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
        <h1 className="Rodal_Title" style={{ textAlign: "center" }}>
          Add New Time
        </h1>
        <Grid container spacing={3}>
          <Typography style={{ color: "green", margin: "0 auto" }}>
            {success}
          </Typography>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {timeStartErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="timeStart"
                  name="timestart"
                  size="small"
                  variant="outlined"
                  value={timeStart}
                  onChange={(e) => {
                    setTimeStart(e.target.value);
                    setTimeStartErr("");
                  }}
                />
              </Grid>
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {timeEndErr}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="TimeEnd"
                  name="timeend"
                  size="small"
                  variant="outlined"
                  value={timeEnd}
                  onChange={(e) => {
                    setTimeEnd(e.target.value);
                    setTimeEndErr("");
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

export default AddInstructorDateRodal;
