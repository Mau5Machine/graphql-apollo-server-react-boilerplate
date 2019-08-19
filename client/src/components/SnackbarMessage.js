import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import clsx from 'clsx'
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: "red",
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
}));

const SnackbarMessage = (props) => {
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  })
  const classes = useStyles();

  const { vertical, horizontal } = state;
  const { error, open, handleClose } = props
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={classes.error}
        message={
          <span className={classes.message}>
            <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
            {error}
          </span>
        }
        action={[
          <CloseIcon key="close" aria-label="close" color="inherit" onClick={handleClose} />
        ]}
      />
    </Snackbar>
  );
};

export default SnackbarMessage;