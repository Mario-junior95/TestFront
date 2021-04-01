import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Axios from "axios";

import MemberShipTypeView from "./MemberShipTypeView";
import EditMemberShipType from "./EditMemberShipType";

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

const MemberShipType = () => {
  const classes = useStyles();

  const [listMemberShipType, setListMemberShipType] = useState([]);
  const [listView, setListView] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const expireToken = () => {
    localStorage.clear() && <Redirect exact="true" to="/Admin-Login" />;
  };

  useEffect(async () => {
    await Axios.get("http://localhost:8000/api/membership", {
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
        console.log(response.data.membership);
        setListMemberShipType(response.data.membership);
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

  /**   Search Section  */

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  useEffect(() => {
    setFilteredData(
      listMemberShipType.filter((membership) =>
        membership.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listMemberShipType]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const [visibleView, setVisibleView] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const showView = () => {
    setVisibleView(true);
  };

  const hideView = () => {
    setVisibleView(false);
  };

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const hideEdit = () => {
    setVisibleEdit(false);
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
                    <b>Membership Type</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Benefits</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Duration</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Amount</b>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
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
                      .map((val, index) => {
                        if (index !== 0) {
                          return (
                            <TableRow key={val.id}>
                              <TableCell align="right">{val.name}</TableCell>
                              <TableCell align="right">
                                {val.benefits.slice(0, 50) + "..."}
                              </TableCell>
                              <TableCell align="right">{val.date}</TableCell>
                              <TableCell align="right">
                                {val.amount}
                                {"$"}
                              </TableCell>
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
                                    setListView(val);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                {/* <input
                                  type="submit"
                                  value={value}
                                  className="delete"
                                  onClick={() => {
                                    handleId(val.id);
                                    if (showHide) {
                                      setValue("hidden");
                                    } else {
                                      setValue("show");
                                    }
                                  }}
                                /> */}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {visibleEdit && (
            <EditMemberShipType
              visible={visibleEdit}
              hide={hideEdit}
              animation={"flip"}
              duration={500}
              closeMaskOnClick={true}
              closeOnEsc={true}
              height={600}
              width={500}
              render={{ setRender }}
              show={showEdit}
              val={listView}
              render={{ setRender }}
            />
          )}

          {visibleView && (
            <MemberShipTypeView
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

export default MemberShipType;
