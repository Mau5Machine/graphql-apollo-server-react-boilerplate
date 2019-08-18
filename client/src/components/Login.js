import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP_MUTATION } from '../graphql/mutations';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Input } from "@material-ui/core";

const styles = {
  container: {
    border: "1px solid black",
    marginTop: "100px",
    padding: "2em"
  }
};
const Login = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [createUser, { data }] = useMutation(SIGN_UP_MUTATION)
  const { classes } = props;
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.container}>
        <form onSubmit={e => {
          e.preventDefault();
          const variables = {
            firstName,
            lastName,
            email,
            username,
            phone,
            password
          }
          console.log(variables)
          createUser({ variables });
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="firstName"
                label="First Name"
                value={firstName}
                margin="normal"
                type="text"
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                margin="normal"
                type="text"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="email"
                label="Email"
                value={email}
                margin="normal"
                type="text"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="username"
                label="Username"
                value={username}
                margin="normal"
                type="text"
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="phone"
                label="Phone"
                value={phone}
                margin="normal"
                type="text"
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="password"
                label="Password"
                value={password}
                margin="normal"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="large" type="submit" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default withStyles(styles)(Login);
