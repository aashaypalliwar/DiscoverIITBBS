import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { TableCell } from '@material-ui/core';
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

const CustomizedMenu = ({ user, currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profile, setProfile] = React.useState(user);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const updatedProfile = () => {
    axios
      .get('/api/v1/user/other?id=' + profile._id, {
        withCredentials: true
      })
      .then(response => {
        // console.log(response.data.data.user);
        setProfile(response.data.data.user);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  //Unpubishing a user //
  const unpublishUser = email => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails
    };
    axios
      .patch('/api/v1/admin/unpublish', data, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        alert('Sucessfully unpublished');
        updatedProfile();
      })
      .catch(err => console.log(err));
  };
  //Publish user
  const publishUser = email => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails
    };
    axios
      .patch('/api/v1/admin/publish', data, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        alert('Sucessfully published');
        updatedProfile();
      })
      .catch(err => console.log(err));
  };
  const verifyUser = email => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails
    };
    axios
      .patch('/api/v1/admin/verify', data, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        alert('Sucessfully verified');
        updatedProfile();
      })
      .catch(err => console.log(err));
  };
  const unverifyUser = email => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails
    };
    axios
      .patch('/api/v1/admin/unverify', data, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        alert('Sucessfully unverified');
        updatedProfile();
      })
      .catch(err => console.log(err));
  };
  const reportUser = id => {
    if (!profile.reporters.includes(currentUser._id)) {
      let data = [];
      axios
        .patch('/api/v1/user/report/' + id, data, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.message == 'This user is already reported by you')
            alert('This user is already reported by you');
          else {
            alert('Sucessfully reported');
            updatedProfile();
          }
          console.log(response);
        })
        .catch(err => console.log(err));
    } else {
      alert('Already reported');
    }
  };
  const clearReports = id => {
    let data = [];
    axios
      .patch('/api/v1/admin/clearReports?id=' + id, data, {
        withCredentials: true
      })
      .then(response => {
        alert('Sucessfully cleared reports');
        updatedProfile();
        console.log(response);
      })
      .catch(err => console.log(err));
  };
  let verify;
  let unpublish;
  let publish;
  let clearReport;
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
        <ListItemText
          primary="Unverify user"
          onClick={() => unverifyUser(profile.email)}
        />
      </StyledMenuItem>
    );
  } else {
    verify = (
      <StyledMenuItem>
        <ListItemText
          primary="Verify user"
          onClick={() => verifyUser(profile.email)}
        />
      </StyledMenuItem>
    );
  }
  //publish status
  if (profile.publishStatus) {
    unpublish = (
      <StyledMenuItem>
        <ListItemText
          primary="Unpublish user"
          onClick={() => unpublishUser(profile.email)}
        />
      </StyledMenuItem>
    );
  } else {
    publish = (
      <StyledMenuItem>
        <ListItemText
          primary="Publish user"
          onClick={() => publishUser(profile.email)}
        />
      </StyledMenuItem>
    );
  }
  if (profile.reportCount > 0) {
    clearReport = (
      <StyledMenuItem>
        <ListItemText
          primary="Clear Report"
          onClick={() => clearReports(profile._id)}
        />
      </StyledMenuItem>
    );
  }

  return (
    <div>
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ float: 'right', color: 'black' }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText
            primary="Report User"
            onClick={() => reportUser(profile._id)}
          />
        </StyledMenuItem>

        {currentUser.role === 'admin' || currentUser.role === 'superAdmin' ? (
          <>
            {clearReport}
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
