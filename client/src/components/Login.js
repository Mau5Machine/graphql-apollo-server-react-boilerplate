import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const styles = {
  container: {
    border: "1px solid black",
    marginTop: "100px",
    padding: "2em"
  }
};
const Login = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.container}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="username"
                label="Username"
                defaultValue=""
                margin="normal"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="password"
                label="Password"
                defaultValue=""
                margin="normal"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="large" color="primary">
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
