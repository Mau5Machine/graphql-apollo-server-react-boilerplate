import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { DELETE_USER_MUTATION } from '../graphql/mutations'
import { useMutation } from '@apollo/react-hooks'

const UserComponent = (props) => {
  const { _id, username, email } = props.user
  const [deleteUserMutation, { error, data }] = useMutation(DELETE_USER_MUTATION, {
    variables: { userId: _id }
  })
  return (
    <ListItem key={_id} role={undefined} dense>
      <ListItemText id={_id} primary={`${username} - ${email}`} />
      <ListItemSecondaryAction>
        <DeleteSharpIcon onClick={() => {
          deleteUserMutation()
            .then(data => alert(data))
            .catch(err => {
              console.log({ err })
              alert(err)
            })
        }} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserComponent;