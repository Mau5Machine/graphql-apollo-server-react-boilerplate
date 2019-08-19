import React, { useState, useContext } from "react";
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP_MUTATION, LOGIN_MUTATION } from '../graphql/mutations';
import { AUTH_TOKEN } from '../constants'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from '@material-ui/core/styles';
import SnackbarMessage from './SnackbarMessage'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography';
import Context from '../context';

const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid black",
    marginTop: "100px",
    padding: "2em"
  },
}));

const Login = props => {
  const { dispatch } = useContext(Context)
  const [state, setState] = useState({
    login: true,
    open: false
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const mobileSize = useMediaQuery('(max-width: 650px)');
  const classes = useStyles();

  const [createNewUser, { error, data }] = useMutation(state.login ? LOGIN_MUTATION : SIGN_UP_MUTATION, {
    variables: { firstName, lastName, email, username, password, phone },
    refetchQueries: ["getAuthPayLoad"],
  })

  const handleOpen = () => setState({ ...state, open: true })
  const handleClose = () => setState({ ...state, open: false })

  const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
    dispatch({ type: "IS_LOGGED_IN", payload: true })
  }

  const confirm = async ({ data }) => {
    const authData = data.data
    const { token } = state.login ? authData.login : authData.createUser;
    const { _id } = state.login ? authData.login.user : authData.createUser.user
    saveUserData(token)
    dispatch({ type: "CURRENT_USER", payload: _id })
    props.history.push('/');
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {state.login ? "Login" : "Register"}
        </Typography>
        <form onSubmit={async e => {
          e.preventDefault();
          createNewUser()
            .then(data => confirm({ data }))
            .catch(err => {
              setErrorMessage(err.message);
              handleOpen()
            })
        }}>
          <Grid container spacing={3}>
            {!state.login && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    margin="normal"
                    fullWidth={mobileSize}
                    type="text"
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    margin="normal"
                    fullWidth={mobileSize}
                    type="text"
                    onChange={e => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    value={email}
                    margin="normal"
                    fullWidth={mobileSize}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    label="Phone"
                    value={phone}
                    margin="normal"
                    fullWidth={mobileSize}
                    type="text"
                    onChange={e => setPhone(e.target.value)}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                label="Username"
                value={username}
                margin="normal"
                fullWidth={mobileSize}
                type="text"
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                label="Password"
                value={password}
                margin="normal"
                fullWidth={mobileSize}
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup size="medium" aria-label="medium outlined button group">
                <Button variant="contained" size="large" type="submit" color="primary">
                  {state.login ? "Log In" : "Sign Up"}
                </Button>
                <Button variant="contained" size="large" color="secondary" onClick={() => {
                  return setState({ ...state, login: !state.login })
                }}>
                  {state.login ? "Need to create an account" : "Already have an account"}
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      </Container>
      {/* Snack bar error message component */}
      <SnackbarMessage
        open={state.open}
        error={errorMessage}
        handleClose={handleClose}
      />
    </React.Fragment >
  );
};

export default Login;
