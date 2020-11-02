import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const AlertDialog = ({ status }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = option => {
    setOpen(false);
    status(option);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteTwoToneIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        align="center"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontSize: 50 }}>
          CONFIRM DELETION
        </DialogTitle>
        <DialogActions style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Button
            onClick={() => {
              handleClose('delete');
            }}
            variant="contained"
            color="primary"
          >
            DELETE
          </Button>
          <Button
            onClick={() => {
              handleClose('cancel');
            }}
            variant="contained"
            autoFocus
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
