import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Axios from "axios";
import "../AdminInfo/AdminInfo.css";

import { TextField } from "@material-ui/core";
import AddInstructorDateRodal from "./AddInstructorDateRodal";
import EditInstructorRodal from "./EditInstructorRodal";

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

import ScheduleIcon from "@material-ui/icons/Schedule";

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

const InstructorDate = () => {
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

  const [listTime, setListTime] = useState([]);

  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [render, setRender] = useState(false);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/time", {
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
        setListTime(response.data.time);
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
  const [visibleEdit, setVisibleEdit] = useState(false);

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
      await Axios.delete(`http://localhost:8000/api/time/${id} `, {
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

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setFilteredData(
      listTime.filter(
        (time) =>
          time.start.toLowerCase().includes(search.toLowerCase()) ||
          time.end.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listTime]);

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
                    <b>Time Start</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Time End</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  
                  <TableCell align="right">
                    <ScheduleIcon
                      onClick={show}
                      style={{ cursor: "pointer" , margin:' 8px 0 0 13vw' }}
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
                            <TableCell align="right">{val.start}</TableCell>
                            <TableCell align="right">{val.end}</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            
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
            <AddInstructorDateRodal
              visible={visible}
              hide={hide}
              animation={"slideDown"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={400}
              width={500}
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
              height={400}
              width={500}
              render={{ setRender }}
              show={showEdit}
              val={list}
              render={{ setRender }}
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

export default InstructorDate;
