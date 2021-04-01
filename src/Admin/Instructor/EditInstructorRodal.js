import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
} from "@material-ui/core";
import Axios from "axios";
import "../AdminInfo/AdminInfo.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const EditInstructorRodal = (props) => {
  const [name, setName] = useState(props.val.name);
  const [email, setEmail] = useState(props.val.email);
  const [contact, setContact] = useState(props.val.phone);
  const [address, setAddress] = useState(props.val.address);
  const [description, setDescription] = useState(props.val.description);
  const [price, setPrice] = useState(props.val.price);
  const [image, setImage] = useState("null");

  const { setRender } = props.render;

  /** error States */

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  const [success, setSuccess] = useState("");

  const [close, setClose] = useState("");

  /** Update Admin */

  const updateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("phone", contact);
    data.append("address", address);
    data.append("email", email);
    data.append("image", image);
    data.append("description", description);
    data.append("price", price);
    try {
      await Axios.post(
        `http://localhost:8000/api/instructor/${props.val.id}?_method=PUT `,
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
          setSuccess("Instructor Updated Successfully!!!");
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        setNameErr(error.response.data.errors.name);
        setEmailErr(error.response.data.errors.email);
        setContactErr(error.response.data.errors.phone);
        setAddressErr(error.response.data.errors.address);
        setImageErr(error.response.data.errors.image);
        setDescriptionErr(error.response.data.errors.description);
        setPriceErr(error.response.data.error.price);
        console.log(error);
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
          <h1 className="Rodal_Title">Update Instructor Info</h1>
          <Grid container spacing={3}>
            <Typography style={{ color: "green", margin: "0 auto" }}>
              {success}
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {nameErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullname"
                    size="small"
                    variant="outlined"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameErr("");
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
                  {contactErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    size="small"
                    variant="outlined"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      setContactErr("");
                    }}
                  />
                </Grid>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {addressErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={inputEl}
                    label="Address"
                    name="address"
                    size="small"
                    variant="outlined"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressErr("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    inputRef={inputEl}
                    label="Price"
                    name="price"
                    size="small"
                    variant="outlined"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setPriceErr("");
                    }}
                  />
                </Grid>
                <Typography style={{ color: "red", margin: "0 auto" }}>
                  {imageErr}
                </Typography>
                <Button>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImageErr("");
                    }}
                  />
                </Button>

                <Typography style={{ color: "red", margin: "0px 15vw" }}>
                  {descriptionErr}
                </Typography>
                <TextareaAutosize
                  rows={5}
                  cols={90}
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
