import React, { useState, inputEl, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "../AdminInfo/AdminInfo.css";
import Axios from "axios";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

const AddAdminShopRodal = (props) => {
  const { setRender } = props.render;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const [listShop, setListShop] = useState([]);

  /** error States */

  const [nameErr, setNameErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [typeErr, setTypeErr] = useState("");

  /**  Clear Data */

  const clearData = () => {
    setName("");
    setNameErr("");
    setImageErr("");
    setPrice("");
    setPriceErr("");
    setTypeErr("");
    setType("");
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
    data.append("image", image);
    data.append("amount", price);
    data.append("type", type);

    try {
      await Axios.post("http://localhost:8000/api/item", data, {
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
          setListShop(response.data.item);
          setRender((prev) => !prev);
          setSuccess("Item Added Successfully!!!");
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
        setTypeErr(error.response.data.errors.type);
        setImageErr(error.response.data.errors.image);
        setPriceErr(error.response.data.errors.amount);
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
          Add New Item
        </h1>
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
                {typeErr}
              </Typography>
              <Grid item xs={12}>
                <Typography>Select Type for your item</Typography>
                <label style={{ paddingTop: "0" }}>
                  <select
                    className="memberType"
                    style={{ color: "black", border: "1px gray solid" }}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                  >
                    <option>--</option>
                    <option value="PROTEINS">PROTEINS</option>
                    <option value="CLOTHES">CLOTHES</option>
                    <option value="GYM STORE">GYM STORE</option>
                  </select>
                </label>
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

export default AddAdminShopRodal;
