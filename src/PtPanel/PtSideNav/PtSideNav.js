import React, { useState } from "react";
import clsx from "clsx";
import "../../Admin/AdminSideNav/AdminSideNav.css";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LockIcon from "@material-ui/icons/Lock";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import LogoWhite from "../../Images/logoWhite.svg";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";

// import EditAdminInfo from "../EditAdminInfo/EditAdminInfo";

import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  ListItem,
  IconButton,
} from "@material-ui/core";

// Import ChangePassword Rodal

// import ChangePasswordRodal from "../ChangePassword/ChangePasswordRodal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(4) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(4.5) + 1,
    },
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
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AdminSideNav() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  /**    Rodal Password   */

  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const [visibleEdit, setVisibleEdit] = useState(false);

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const hideEdit = () => {
    setVisibleEdit(false);
  };

  /**    Logout Button Confirmation */

  const fire = () => {
    localStorage.removeItem("idPt");
    localStorage.removeItem("usernamePt");
    localStorage.removeItem("PtToken");
    history.push("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {localStorage.getItem("tokens") ? (
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          ) : (
            <Typography variant="h6" noWrap>
              Pt Panel
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <img
          src={LogoWhite}
          alt="logo_error"
          style={{ margin: "-4vw 0 0 0" }}
        />
        <List>
          <ListItem>
            <Link to="/pt-members">
              <div>
                <PeopleAltIcon />
                Members
              </div>
            </Link>
          </ListItem>
          <ListItem className={classes.root}>
            <Button color="secondary" onClick={fire}>
              <div>
                <ExitToAppIcon style={{ marginLeft: "-2.6vw" }} />
                Logout
              </div>
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
