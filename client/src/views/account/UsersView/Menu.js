import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const CustomizedMenu = ({ profile, currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let verify;
  let unpublish;
  let publish;
  if (typeof currentUser == 'string') {
    currentUser = JSON.parse(currentUser);
  }
  if (currentUser.role == 'visitor' || currentUser.email === profile.email) {
    return null;
  }
  //Verify
  if (profile.verifyStatus) {
    verify = (
      <StyledMenuItem>
        <ListItemText primary="Verify user" />
      </StyledMenuItem>
    );
  } else {
    verify = (
      <StyledMenuItem>
        <ListItemText primary="Unverify user" />
      </StyledMenuItem>
    );
  }

  if (profile.publishStatus) {
    unpublish = (
      <StyledMenuItem>
        <ListItemText primary="Unpublish user" />
      </StyledMenuItem>
    );
  } else {
    publish = (
      <StyledMenuItem>
        <ListItemText primary="Publish user" />
      </StyledMenuItem>
    );
  }

  //Publish or Unpublish

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Report User" />
        </StyledMenuItem>

        {currentUser.role === 'admin' || currentUser.role === 'superAdmin' ? (
          <>
            {verify}
            {unpublish}
          </>
        ) : null}
        {currentUser.role === 'superAdmin' ? <> {publish} </> : null}
      </StyledMenu>
    </div>
  );
};

export default CustomizedMenu;
