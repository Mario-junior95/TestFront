import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Axios from "axios";
import "./AdminInfo.css";

import { TextField } from "@material-ui/core";
import AddAdminRodal from "./AddAdminRodal";
// import EditAdminRodal from "./EditAdminRodal";

import {
  Typography,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminInfo = () => {
  const classes = useStyles();

  const history = useHistory();

  const routeChange = () => {
    let path = `/admin-Login`;
    history.push(path);
  };

  const clearStorage = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("username");
    localStorage.removeItem("idAdmin");
    routeChange();
  };

  const [listAdmin, setlistAdmin] = useState([]);

  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/admin", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("superAdminToken"),
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
        setlistAdmin(response.data.admin);
      }
    });
  }, [render]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 5);
    setPage(0);
  };

  /**  Rodal Delete Functions  */
  const [visible, setVisible] = useState(false);
  // const [visibleEdit, setVisibleEdit] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  // const showEdit = () => {
  //   setVisibleEdit(true);
  // };

  // const hideEdit = () => {
  //   setVisibleEdit(false);
  // };

  /** Delete Admin */

  const deleteAdmin = async (id) => {
    try {
      await Axios.delete(`http://localhost:8000/api/admin/${id} `, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("superAdminToken"),
        },
      }).then((response) => {
        if (
          response.data.status === "Token is Expired" ||
          response.data.status === "Token is Invalid" ||
          response.data.status === "Authorization Token not found"
        ) {
          expireToken();
          return window.location.reload();
        } else if (response.status === 200) {
          if (localStorage.getItem("idAdmin") === `${id}`) {
            clearStorage();
          } else {
            console.log(response);
            setRender((prev) => !prev);
            // console.log(localStorage.getItem("idAdmin") === `${id}`);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setFilteredData(
      listAdmin.filter(
        (admin) =>
          admin.firstname.toLowerCase().includes(search.toLowerCase()) ||
          admin.lastname.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase()) ||
          admin.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listAdmin]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={classes.root}>
      <AdminSideNav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <b>Username</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>FirstName</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>LastName</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <PersonAddIcon
                      onClick={show}
                      style={{ cursor: "pointer" }}
                    />
                    {visible && (
                      <AddAdminRodal
                        visible={visible}
                        hide={hide}
                        animation={"slideDown"}
                        duration={500}
                        closeMaskOnClick={true}
                        closeOnEsc={true}
                        height={550}
                        width={500}
                        render={{ setRender }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <Typography style={{ color: "red" }}>
                    No Result Found
                  </Typography>
                ) : (
                  <>
                    {currentPosts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((val) => {
                        return (
                          <TableRow key={val.id}>
                            <TableCell align="right">{val.username}</TableCell>
                            <TableCell align="right">{val.firstname}</TableCell>
                            <TableCell align="right">{val.lastname}</TableCell>
                            <TableCell align="right">{val.email}</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                              <input
                                type="submit"
                                value="Delete"
                                className="delete"
                                onClick={() => deleteAdmin(val.id)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <TextField
              fullWidth
              label="Search"
              name="search"
              size="small"
              variant="outlined"
              style={{ width: "20vw", margin: "6px 0 0 6px" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <TablePagination
              rowsPerPageOptions={[4, 7]}
              component="div"
              count={currentPosts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </main>
    </div>
  );
};

export default AdminInfo;
