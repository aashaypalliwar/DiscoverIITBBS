import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

const links = ['LinkedIn', 'GitHub', 'Facebook', 'Instagram', 'Twitter'];
const useStyles = makeStyles({
  root: {},
  dialog: {
    marginRight: 90
  }
});

const getLogo = name => {
  switch (name) {
    case 'LinkedIn':
      return 'https://img.icons8.com/fluent/48/000000/linkedin.png';
    case 'GitHub':
      return 'https://img.icons8.com/fluent/48/000000/github.png';
    case 'Instagram':
      return 'https://img.icons8.com/fluent/48/000000/instagram-new.png';
    case 'Facebook':
      return 'https://img.icons8.com/fluent/48/000000/facebook-new.png';
    case 'Twitter':
      return 'https://img.icons8.com/fluent/48/000000/twitter.png';
  }
};

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">ADD CONTACT LINK</DialogTitle>
      <List>
        {links.map(link => {
          let posLink = [];
          if (data) {
            posLink = data.filter(el => {
              if (el.name === link) return true;
            });
          }
          if (posLink.length === 0) {
            return (
              <ListItem
                button
                className={classes.dialog}
                onClick={() => handleListItemClick(link)}
                key={link}
              >
                <ListItemAvatar>
                  <Avatar src={getLogo(link)}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={link} />
              </ListItem>
            );
          }
        })}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

const SimpleDialogDemo = ({ addIt, currentLinks }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
    addIt(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddIcon />
        Add new link
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        data={currentLinks}
      />
    </div>
  );
};

export default SimpleDialogDemo;
