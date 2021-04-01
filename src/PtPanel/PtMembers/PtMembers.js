import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PtSideNav from "../PtSideNav/PtSideNav";
import Axios from "axios";
import "../../Admin/AdminInfo/AdminInfo.css";

import {
  Typography,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
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

const PtMembers = () => {
  const classes = useStyles();

  const [listUser, setListUser] = useState([]);

  const [render, setRender] = useState(false);

  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/pt-login" />;
  };

  useEffect(async () => {
    await Axios.get(
      `http://localhost:8000/api/instructor/${localStorage.getItem("idPt")}`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("PtToken"),
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
        setListUser(response.data.instructor);
        console.log(response.data.instructor);
        // console.log(response.data.user[0].user_instructor);
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
      listUser.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listUser]);

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

  return (
    <div className={classes.root} style={{ overflow: "hidden" }}>
      <PtSideNav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper>
          <div>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>LastName</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Email</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Phone</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Address</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Date Of Birth</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Gender</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Reservation Date</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Time Start</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Time End</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

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
                        return val.instructor_user.map((i) => {
                          return (
                            <TableBody key={i.id}>
                              <TableCell align="center">
                                {i.firstname}
                              </TableCell>
                              <TableCell align="center">{i.lastname}</TableCell>
                              <TableCell align="center">{i.email}</TableCell>
                              <TableCell align="center">{i.phone}</TableCell>
                              <TableCell align="center">{i.address}</TableCell>
                              <TableCell align="center">{i.date}</TableCell>
                              <TableCell align="center">{i.gender}</TableCell>
                            </TableBody>
                          );
                        });
                      })}
                  </>
                )}
              </Table>
            </TableContainer>

            <div
              style={{
                position: "fixed",
                top: "13.6vw",
                width: "18vw",
                zIndex: "2",
                left: " 81vw",
              }}
            >
              {filteredData.length === 0 ? (
                <Typography style={{ color: "red" }}>
                  No Result Found
                </Typography>
              ) : (
                <>
                  {currentPosts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((val) => {
                      return val.time.map((i) => {
                        console.log(i.start);
                        console.log(i.end);
                        return (
                          <TableBody key={i.id}>
                            <TableCell
                              align="center"
                              style={{ width: "8.6vw" }}
                            >
                              {i.start}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ width: "8.6vw" }}
                            >
                              {i.end}
                            </TableCell>
                          </TableBody>
                        );
                      });
                    })}
                </>
              )}
            </div>

            <div
              style={{
                position: "fixed",
                top: "13.6vw",
                left: "68vw",
                width: "18vw",
                zIndex: " 2",
              }}
            >
              {filteredData.length === 0 ? (
                <Typography style={{ color: "red" }}>
                  No Result Found
                </Typography>
              ) : (
                <>
                  {currentPosts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((val) => {
                      return val.dates.map((j) => {
                        return (
                          <TableBody key={j.id}>
                            <TableCell align="center" style={{ width: "14vw" }}>
                              {j.date.slice(0, 16)}
                            </TableCell>
                          </TableBody>
                        );
                      });
                    })}
                </>
              )}
            </div>
          </div>

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
          </div>
        </Paper>
      </main>
    </div>
  );
};

export default PtMembers;
