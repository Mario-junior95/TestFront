import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Axios from "axios";

import { TextField } from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import EditWorkoutRodal from "./EditWorkoutRodal";
import ViewWorkoutRodal from "./ViewWorkoutRodal";

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

  const [listWorkouts, setlistWorkouts] = useState([]);

  const [list, setList] = useState([]);
  const [listView, setListView] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/workout", {
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
        setlistWorkouts(response.data.workout);
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

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleView, setVisibleView] = useState(false);

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const hideEdit = () => {
    setVisibleEdit(false);
  };

  const showView = () => {
    setVisibleView(true);
  };

  const hideView = () => {
    setVisibleView(false);
  };

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setFilteredData(
      listWorkouts.filter((workout) =>
        workout.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listWorkouts]);

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
                    <b>Name</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Description</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <FitnessCenterIcon
                      style={{ cursor: "pointer", margin: "8px 0 0 8vw" }}
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
                            <TableCell align="right">
                              {val.description.slice(0, 50) + "..."}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                              <input
                                type="submit"
                                value="View"
                                className="view"
                                onClick={() => {
                                  showView();
                                  setListView(val);
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
                          </TableRow>
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {visibleEdit && (
            <EditWorkoutRodal
              visible={visibleEdit}
              hide={hideEdit}
              animation={"flip"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={550}
              width={500}
              render={{ setRender }}
              show={showEdit}
              val={list}
            />
          )}

          {visibleView && (
            <ViewWorkoutRodal
              visible={visibleView}
              hide={hideView}
              animation={"rotate"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={631}
              width={500}
              show={showView}
              val={listView}
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
              rowsPerPageOptions={[3, 6]}
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
