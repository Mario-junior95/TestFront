import React, { useState, inputEl } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../AdminInfo/AdminInfo.css";
import Axios from "axios";
import {
  Button,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
} from "@material-ui/core";

const AddInstructorRodal = (props) => {
  
  const { setRender } = props.render;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [listInstructor, setListInstructor] = useState([]);

  /** error States */

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [usernameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setName("");
    setEmail("");
    setContact("");
    setAddress("");
    setNameErr("");
    setEmailErr("");
    setContactErr("");
    setAddressErr("");
    setImageErr("");
    setDescription("");
    setDescriptionErr("");
    setPrice("");
    setPriceErr("");
    setUserName("");
    setPassword("");
    setPasswordErr("");
    setUserNameErr("");
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
    data.append("name", name);
    data.append("email", email);
    data.append("phone", contact);
    data.append("address", address);
    data.append("image", image);
    data.append("description", description);
    data.append("price", price);
    data.append("username", userName);
    data.append("password", password);
    try {
      await Axios.post("http://localhost:8000/api/instructor", data, {
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
          setListInstructor(response.data.instructor);
          setRender((prev) => !prev);
          setSuccess("Instructor Added Successfully!!!");
          clearData();
          setTimeout(() => {
            setClose(props.hide);
          }, 2300);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error);
        setNameErr(error.response.data.errors.name);
        setEmailErr(error.response.data.errors.email);
        setContactErr(error.response.data.errors.phone);
        setAddressErr(error.response.data.errors.address);
        setImageErr(error.response.data.errors.image);
        setDescriptionErr(error.response.data.errors.description);
        setPriceErr(error.response.data.errors.price);
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
        <h1 className="Rodal_Title">Add New Instructor</h1>
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

              {/* <Typography style={{ color: "red", margin: "0 auto" }}>
                {nameErr}
              </Typography> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
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

              {/* <Typography style={{ color: "red", margin: "0 auto" }}>
                {nameErr}
              </Typography> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErr("");
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
              <Typography style={{ color: "red", margin: "0 auto" }}>
                {priceErr}
              </Typography>
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
              <Typography style={{ color: "red", margin: "0px 20vw" }}>
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

export default AddInstructorRodal;
