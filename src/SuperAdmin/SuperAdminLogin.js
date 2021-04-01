import React, { useState, useEffect, inputEl } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

import "../Admin/AdminLogin/AdminLogin.css";

// MUI Core
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const SuperAdminLogin = () => {
  /**     states    */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [superAdminToken, setSuperAdminToken] = useState("");

  /** Error States */

  const [usernameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [handleError, setHandleError] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8000/api/superadmin-login", {
        username: username,
        password: password,
      }).then((response) => {
        setSuperAdminToken(response.data.access_token);

        localStorage.setItem(
          "usernameSuperAdmin",
          response.data.superAdmin.username
        );
        localStorage.setItem("idSuperAdmin", response.data.superAdmin.id);
        response &&
          response.data &&
          response.data.access_token &&
          localStorage.setItem("superAdminToken", response.data.access_token);
      });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        try {
          setUserNameError(error.response.data.errors.username);
          setPasswordError(error.response.data.errors.password);
        } catch (error) {
          setHandleError("Invalid Username or password");
        }
      }
    }
  };

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    setRedirect(localStorage.getItem("superAdminToken"));
  }, []);

  if (redirect) {
    return <Redirect to="/admin-home" />;
  } else {
    <Redirect to="/superadmin-Login" />;
  }

  return (
    <Container maxWidth="xs" className="adminContainer">
      <form>
        <h1>Super Admin Panel</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Typography style={{ color: "red", marginLeft: "4px" }}>
                {handleError}
              </Typography>
              <Typography style={{ color: "red", marginLeft: "4px" }}>
                {usernameError}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  inputRef={inputEl}
                  label="Username"
                  name="username"
                  size="small"
                  className = "usernamField"
                  variant="outlined"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUserNameError("");
                    setPasswordError("");
                  }}
                  value={username}
                />
              </Grid>
              <Typography style={{ color: "red", marginLeft: "9px" }}>
                {passwordError}
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  className = "passwordField"
                  variant="outlined"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                    setUserNameError("");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={HandleLogin}
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SuperAdminLogin;
