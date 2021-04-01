import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Axios from "axios";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

const EditInstructorRodal = (props) => {
  const [startTime, setStartTime] = useState(props.val.start);
  const [endTime, setEndTime] = useState(props.val.end);

  const { setRender } = props.render;

  /** error States */

  const [startTimeErr, setStartTimeErr] = useState("");
  const [endTimeErr, setEndTimeErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Admin */

  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("start", startTime);
    data.append("end", endTime);
    try {
      await Axios.post(
        `http://localhost:8000/api/time/${props.val.id}?_method=PUT `,
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
        setStartTimeErr(error.response.data.errors.start);
        setEndTimeErr(error.response.data.errors.end);
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
            Update Time Info
          </h1>
          <Grid container spacing={3}>
            <Typography style={{ color: "green", margin: "0 auto" }}>
              {success}
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {startTimeErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={inputEl}
                    label="Start Time"
                    name="starttime"
                    size="small"
                    variant="outlined"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setStartTimeErr("");
                    }}
                  />
                </Grid>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {endTimeErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="End Time"
                    name="endtime"
                    size="small"
                    variant="outlined"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                      setEndTimeErr("");
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

export default EditInstructorRodal;
