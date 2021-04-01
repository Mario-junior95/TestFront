import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Axios from "axios";
import "../AdminInfo/AdminInfo.css";

import { TextField } from "@material-ui/core";

import AddInstructorRodal from "./AddInstructorRodal";
import EditInstructorRodal from "./EditInstructorRodal";
import ViewInstructorRodal from "./ViewInstructorRodal";

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

const Instructor = () => {
  const classes = useStyles();

  const [listInstructor, setListInstructor] = useState([]);

  const [render, setRender] = useState(false);

  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/instructor", {
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
      }
    });
  }, [render]);

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setFilteredData(
      listInstructor.filter(
        (instructor) =>
          instructor.name.toLowerCase().includes(search.toLowerCase()) ||
          instructor.email.toLowerCase().includes(search.toLowerCase()) ||
          instructor.address.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listInstructor]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 5);
    setPage(0);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const [visibleView, setVisibleView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const showView = () => {
    setVisibleView(true);
  };

  const hideView = () => {
    setVisibleView(false);
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const hideEdit = () => {
    setVisibleEdit(false);
  };

  /** Delete Admin */

  const deleteAdmin = async (id) => {
    try {
      await Axios.delete(`http://localhost:8000/api/instructor/${id} `, {
        headers: {
          Accept: "application/json",
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
        } else if (response.status === 200) {
          console.log(response);
          setRender((prev) => !prev);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                    <b>Name</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Address</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Contact</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Description</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Cost</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>

                  <TableCell align="right">
                    <PersonAddIcon
                      onClick={show}
                      style={{ cursor: "pointer", margin: "8px 0 0 6vw" }}
                    />
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
                            <TableCell align="right">{val.name}</TableCell>
                            <TableCell align="right">{val.email}</TableCell>
                            <TableCell align="right">{val.address}</TableCell>
                            <TableCell align="right">{val.phone}</TableCell>
                            <TableCell align="right">
                              {val.description.slice(0, 25) + "..."}
                            </TableCell>
                            <TableCell align="right">
                              {val.price + " $"}
                            </TableCell>
                            <TableCell align="right">
                              <input
                                type="submit"
                                value="View"
                                className="view"
                                onClick={() => {
                                  showView();
                                  setList(val);
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <input
                                type="submit"
                                value="Edit"
                                className="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  showEdit();
                                  setList(val);
                                }}
                              />
                            </TableCell>
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
          {visible && (
            <AddInstructorRodal
              visible={visible}
              hide={hide}
              animation={"slideDown"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={755}
              width={750}
              render={{ setRender }}
            />
          )}
          {visibleEdit && (
            <EditInstructorRodal
              visible={visibleEdit}
              hide={hideEdit}
              animation={"flip"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={643}
              width={600}
              render={{ setRender }}
              show={showEdit}
              val={list}
              render={{ setRender }}
            />
          )}

          {visibleView && (
            <ViewInstructorRodal
              visible={visibleView}
              hide={hideView}
              animation={"rotate"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={650}
              width={800}
              show={showView}
              val={list}
            />
          )}

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

export default Instructor;
