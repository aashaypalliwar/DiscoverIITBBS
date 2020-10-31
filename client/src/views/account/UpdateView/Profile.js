import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ profile, className, ...rest }) => {
  const classes = useStyles();
  // const user = {
  //   avatar: '/static/images/avatars/avatar_6.png',
  //   city: 'Los Angeles',
  //   country: 'USA',
  //   jobTitle: 'Senior Developer',
  //   name: 'Katarina Smith',
  //   timezone: 'GTM-7'
  // };

  return (
    <div>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={profile.image} />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {profile.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Email : </span>{' '}
              {profile.email}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Bio : </span> {profile.bio}
            </Typography>
            {/* <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography> */}
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
      </Card>
      <br></br>
      <br></br>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Typography color="textPrimary" gutterBottom variant="h3">
              Personal details
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Branch : </span>{' '}
              {profile.branch}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Admission year : </span>{' '}
              {profile.admissionYear || 'Update'}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Graduation year : </span>{' '}
              {profile.graduationYear || 'Update'}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span style={{ fontWeight: 'bold' }}>Publish Status : </span>{' '}
              {profile.publishStatus ? 'True' : 'False'}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
      </Card>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
