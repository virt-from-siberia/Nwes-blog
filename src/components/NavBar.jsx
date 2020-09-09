import React, { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { useSnackbar } from "notistack";

import { AuthContext } from "@/context/AuthContext";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const ElevateAppBar = React.memo(function ElevateAppBar(props) {
  const history = useHistory();
  const { approvNews } = useSelector((store) => store.news);
  const { enqueueSnackbar } = useSnackbar();
  const auth = useContext(AuthContext);

  const setNotifySuccessChange = useCallback(
    () =>
      enqueueSnackbar("Выход из аккаунта выполнен", {
        variant: "success",
        preventDuplicate: true,
      }),
    []
  );

  const logoutHandler = () => {
    auth.logout();
    history.push("./");
    setNotifySuccessChange();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <div
              className='navBar'
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link to='/' className='navBar__logo'>
                <Typography variant='h6' noWrap>
                  World news
                </Typography>
              </Link>
              {auth.token === "admin" ? (
                <div className='navBar__admin'>
                  <p> Новости на модерацию</p>
                  <Badge
                    badgeContent={approvNews && approvNews}
                    color='secondary'
                  >
                    <MailIcon />
                  </Badge>
                </div>
              ) : null}

              {props.isAuthenticated && props.isAuthenticated ? (
                <Button
                  onClick={logoutHandler}
                  style={{
                    backgroundColor: "#11c55c",
                    color: "white",
                  }}
                  variant='contained'
                  startIcon={<ExitToAppIcon />}
                >
                  Выход из аккаунта
                </Button>
              ) : (
                <Button
                  onClick={() => props.setShowPopap(true)}
                  style={{
                    backgroundColor: "#11c55c",
                    color: "white",
                  }}
                  variant='contained'
                  startIcon={<AccountBoxIcon />}
                >
                  Вход
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
});

export default ElevateAppBar;
