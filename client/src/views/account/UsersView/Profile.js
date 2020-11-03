import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles,
  Tooltip,
  IconButton
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CustomizedMenu from './Menu';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    fontSize: 17,
    right: 0,
    position: 'relative'
  },
  text: {
    fontSize: 17
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 12
  },
  table: {
    minWidth: 100,
    fontFamily: 'Roboto',
    overflowY: 'hidden'
  },
  row: {
    width: 300
  },
  cellB: {
    fontWeight: 500,
    border: 0,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8
  },
  cellC: {
    border: 0,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center'
  },
  cellBA: {
    fontWeight: 500,
    border: 0,
    fontSize: 18
  },
  cell: {
    border: 0,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex'
  },
  icons: {
    height: 50,
    width: 50
  },
  links: {
    alignItems: 'center',
    alignContent: 'center'
  },
  align: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  right: {
    textAlign: 'right'
  },
  chip: {
    margin: 5,
    cursor: 'default'
  }
}));

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
    default:
      return ' ';
  }
};

const Profile = ({
  profile,
  currentUser,
  updateProfile,
  className,
  ...rest
}) => {
  const classes = useStyles();
  if (typeof currentUser === 'string') currentUser = JSON.parse(currentUser);

  let style;
  if (currentUser.role === 'visitor' || currentUser.email === profile.email) {
    style = null;
  } else {
    style = { transform: `translateX(16px)` };
  }

  const rows = [
    createData('Branch', profile.branch),
    createData('Admission Year', profile.admissionYear || 'Update'),
    createData('Graduation Year', profile.graduationYear || 'Update')
  ];

  let tagMap = {};
  for (let tag of profile.tags) {
    tagMap[tag.group] = [];
  }
  for (let tag of profile.tags) {
    tagMap[tag.group].push(tag);
  }
  let tagMapArray = [];
  for (let group in tagMap) {
    tagMapArray.push({ name: group, tags: tagMap[group] });
  }
  let verifyIcon;
  let nullIcon;
  if (profile.verifyStatus) {
    verifyIcon = (
      <Tooltip title="Verified">
        <IconButton aria-label="verified">
          <CheckCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    );
    nullIcon = (
      <IconButton aria-label="verified" disabled>
        <CheckCircleIcon color="primary" style={{ visibility: 'hidden' }} />
      </IconButton>
    );
  }

  return (
    <div>
      <Grid container className={classes.align} spacing={1} justify="center">
        <Grid item lg={5} md={10} xs={12}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CustomizedMenu
              user={profile}
              currentUser={currentUser}
              updateProfile={updateProfile}
            />
            <CardContent>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                style={style}
              >
                <Avatar className={classes.avatar} src={profile.image} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {nullIcon}
                  {profile.name} {verifyIcon}
                </Typography>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  variant="body1"
                >
                  {profile.email}
                </Typography>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  variant="body1"
                >
                  <b>Bio :</b> {profile.bio}
                </Typography>
              </Box>
            </CardContent>
            <CardContent>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.cellB}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell className={classes.cellC}>
                          {row.calories}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.cellB}
                        colSpan={2}
                        align="center"
                      >
                        {profile.publishStatus &&
                        (currentUser.role === 'admin' ||
                          currentUser.role === 'superAdmin') ? (
                          <>This profile is published</>
                        ) : null}
                        {!profile.publishStatus &&
                        (currentUser.role === 'admin' ||
                          currentUser.role === 'superAdmin') ? (
                          <>This profile is unpublished</>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Divider />
          </Card>
        </Grid>
        <Grid item lg={7} md={10} xs={12} className={classes.align}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent align="center">
              <Typography color="textPrimary" gutterBottom variant="h3">
                Contact info
              </Typography>
              <Grid container justify="center">
                {profile.links !== undefined && profile.links.length !== 0 ? (
                  profile.links.map((link, index) => {
                    return (
                      <Link href={link.url} target="_blank">
                        <Avatar
                          className={classes.icons}
                          src={getLogo(link.name)}
                          key={index}
                        />
                      </Link>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align="center" style={{ border: 0 }}>
                      <Chip label="No contact info of the user available" />
                    </TableCell>
                  </TableRow>
                )}
              </Grid>
            </CardContent>
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Typography color="textPrimary" gutterBottom variant="h3">
                  Skills & Tags
                </Typography>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {profile.tags !== undefined &&
                      profile.tags.length !== 0 ? (
                        tagMapArray
                          .sort((a, b) => {
                            if (a.name < b.name) return -1;
                            return 1;
                          })
                          .map((group, index) => {
                            return [
                              <TableRow className={classes.cellBA}>
                                &nbsp;&nbsp;&nbsp;&nbsp;{group.name}
                              </TableRow>,
                              <TableRow className={classes.cell}>
                                <TableCell style={{ borderBottom: 0 }}>
                                  {group.tags.map((tag, index) => {
                                    return (
                                      <Chip
                                        size="small"
                                        key={tag.name}
                                        className={classes.chip}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                          return null;
                                        }}
                                        label={tag.name}
                                      />
                                    );
                                  })}
                                </TableCell>
                              </TableRow>
                            ];
                          })
                      ) : (
                        <TableRow>
                          <TableCell align="center" style={{ border: 0 }}>
                            <Chip label="No tags available for this user" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
