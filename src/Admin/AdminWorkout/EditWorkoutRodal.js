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

const EditWorkoutRodal = (props) => {
  const [description, setDescription] = useState(props.val.description);
  const [image, setImage] = useState(null);

  const { setRender } = props.render;

  /** error States */

  const [descriptionErr, setDescriptionErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Admin */

  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("description", description);
    data.append("image", image);
    try {
      await Axios.post(
        `https://pumpkin-shortcake-86885.herokuapp.com/api/workout/${props.val.id}?_method=PUT `,
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
          setSuccess("Wrokout Updated Successfully!!!");
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setDescriptionErr(error.response.data.errors.description);
        // console.log(error);
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
            Update Workout Info
          </h1>
          <Grid container spacing={3}>
            <Typography style={{ color: "green", margin: "0 auto" }}>
              {success}
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {descriptionErr}
                </Typography>
                <Typography
                  style={{
                    marginRight: "26vw",
                    color: "#2196f3",
                    textTransform: "uppercase",
                    fontFamily: "Impact, Arial black, sans-serif",
                  }}
                >
                  Description
                </Typography>
                <Grid item xs={12}>
                  <TextareaAutosize
                    rows={10}
                    cols={56}
                    fullWidth
                    inputRef={inputEl}
                    label="Description"
                    name="description"
                    size="small"
                    variant="outlined"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setDescriptionErr("");
                    }}
                  />
                  <Grid item xs={12}></Grid>
                  <Button>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
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

export default EditWorkoutRodal;
