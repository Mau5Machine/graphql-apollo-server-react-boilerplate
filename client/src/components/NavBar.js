import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AUTH_TOKEN } from '../constants'
import { withRouter } from 'react-router-dom'
import Context from '../context'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const { dispatch } = useContext(Context)
  const classes = useStyles();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AFK Developer
          </Typography>
          {authToken ? (
            <Button color="inherit" onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              dispatch({ type: "SIGNOUT_USER" })
              props.history.push('/login')
            }}>Logout</Button>
          ) : (
              <Button color="inherit" onClick={() => props.history.push('/login')}>Login</Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar)