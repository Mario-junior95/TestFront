import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  TextField,
} from "@material-ui/core";

import Axios from "axios";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const AddHomeRodal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [listHome, setListHome] = useState([]);

  const { setRender } = props.render;

  /** error States */

  const [descriptionErr, setDescriptionErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [imageErr, setImageErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  const clearData = () => {
    setTitle("");
    setTitleErr("");
    setDescription("");
    setDescriptionErr("");
    setImage("");
    setImageErr("");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    try {
      await Axios.post("http://localhost:8000/api/home", data, {
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
          setListHome(response.data.home);
          setRender((prev) => !prev);
          setSuccess("Block Added Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setTitleErr(error.response.data.errors.title);
        setDescriptionErr(error.response.data.errors.description);
        setImageErr(error.response.data.errors.image);
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
            Add New Block
          </h1>
          <Grid container spacing={3}>
            <Typography style={{ color: "green", margin: "0 auto" }}>
              {success}
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {titleErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    size="small"
                    variant="outlined"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleErr("");
                    }}
                  />
                </Grid>
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
                  <Typography style={{ color: "red", margin: "0 auto" }}>
                    {imageErr}
                  </Typography>
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
                onClick={handleAdd}
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

export default AddHomeRodal;
