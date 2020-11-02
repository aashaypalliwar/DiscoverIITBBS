import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableRow,
  TextField,
  makeStyles,
  TableCell,
  TableContainer
} from '@material-ui/core';

import { clone } from 'ramda';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';

import AddIcon from '@material-ui/icons/Add';

import Dialog from './Dialog';
import ConfirmDialog from './ConfirmDialog';

import TagGroup from './TagGroup';

import axios from 'axios';

import validUrl from 'valid-url';

const admissionYears = [
  {
    value: 2016,
    label: 2016
  },
  {
    value: 2017,
    label: 2017
  },
  {
    value: 2018,
    label: 2018
  },
  {
    value: 2019,
    label: 2019
  },
  {
    value: 2020,
    label: 2020
  }
];
const graduationYears = [
  {
    value: 2020,
    label: 2020
  },
  {
    value: 2021,
    label: 2021
  },
  {
    value: 2022,
    label: 2022
  },
  {
    value: 2023,
    label: 2023
  },
  {
    value: 2024,
    label: 2024
  },
  {
    value: 2025,
    label: 'N/A'
  }
];

const branches = [
  {
    value: 'Not Specified',
    label: 'Not Specified'
  },
  {
    value: 'CSE',
    label: 'CSE'
  },
  {
    value: 'ECE',
    label: 'ECE'
  },
  {
    value: 'EE',
    label: 'EE'
  },
  {
    value: 'ME',
    label: 'ME'
  },
  {
    value: 'CE',
    label: 'CE'
  },
  {
    value: 'MM',
    label: 'MM'
  },
  {
    value: 'SBS',
    label: 'SBS'
  },
  {
    value: 'SEOCS',
    label: 'SEOCS'
  },
  {
    value: 'SHSS&M',
    label: 'SHSS&M'
  }
];

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

const useStyles = makeStyles(() => ({
  root: {},
  link: {
    padding: 10,
    marginBottom: 5,
    // display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    color: 'blue'
  },
  heading: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  text: {
    width: '100%'
  }
}));

const isProperLink = link => {
  if (
    link.url.includes(`//${link.name.toLowerCase()}.com`) ||
    link.url.includes(`www.${link.name.toLowerCase()}.com`)
  ) {
    if (link.url.endsWith('.com') || link.url.endsWith('.com/')) {
      return false;
    }
    return true;
  }
  return false;
};

const verifyLinks = links => {
  let culprit = null;
  for (let link of links) {
    if (!link.url) return link;
    if (!isProperLink(link) || !validUrl.isHttpsUri(link.url)) {
      culprit = link;
      break;
    }
  }
  return culprit;
};

const updateProfile = values => {
  const data = { ...values };
  let culprit = verifyLinks(data.links);
  if (culprit === null) {
    axios
      .patch('/api/v1/user/profile', data, {
        withCredentials: true
      })
      .then(response => {
        window.location.href = '/profile';
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert(`Invalid ${culprit.name} link`);
  }
};

const ProfileDetails = ({ profile, className, ...rest }) => {
  const classes = useStyles();
  const [allTags, setAllTags] = useState(null);
  const [restTags, setRestTags] = useState(null);

  const [values, setValues] = useState({
    bio: profile.bio,
    admissionYear: profile.admissionYear || 2016,
    branch: profile.branch,
    graduationYear: profile.graduationYear || 2020,
    links: profile.links || null,
    tags: profile.tags || null
  });

  const [linkEdit, setLinkEdit] = useState({
    LinkedIn: false,
    GitHub: false,
    Facebook: false,
    Instagram: false,
    Twitter: false
  });

  const [isExpanded, setIsExpanded] = useState({
    LinkedIn: false,
    GitHub: false,
    Facebook: false,
    Instagram: false,
    Twitter: false
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [sortedTags, setSortedTags] = useState([]);

  const displayFilterPane = () => {
    setSelectedTags([]);
    let tagMap = {};
    for (let tag of restTags) {
      tagMap[tag.group] = [];
    }
    for (let tag of restTags) {
      tagMap[tag.group].push(tag);
    }
    let tagMapArray = [];
    for (let group in tagMap) {
      tagMapArray.push({ name: group, tags: tagMap[group] });
    }
    setSortedTags(tagMapArray);
    setFilterVisibility(true);
  };

  const hideFilterPane = () => {
    setSelectedTags([]);
    setFilterVisibility(false);
  };

  const addToSelected = tagID => {
    let newSelection = clone(selectedTags);
    newSelection.push(tagID);
    setSelectedTags(newSelection);
  };

  const removeFromSelected = tagID => {
    let newSelection = clone(selectedTags);
    let index = newSelection.indexOf(tagID);
    newSelection.splice(index, 1);
    setSelectedTags(newSelection);
  };

  const addSelectedTags = () => {
    let rest = restTags;
    rest = rest.filter(tag => {
      return !selectedTags.map(el => el._id).includes(tag._id);
    });
    setRestTags(rest);

    let tags = values.tags;
    selectedTags.forEach(tag => {
      tags.push(tag);
    });
    setValues({ ...values, tags: tags });

    setFilterVisibility(false);
  };

  const getAllTags = () => {
    axios
      .get('/api/v1/user/tag', {
        withCredentials: true
      })
      .then(response => {
        let rest = response.data.data.docs.filter(tag => {
          return !values.tags.map(el => el._id).includes(tag._id);
        });
        setRestTags(rest);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleLinkEdit = name => {
    setLinkEdit({ ...linkEdit, [name]: true });
  };

  const handleChange = event => {
    if (event.target.id.startsWith('link')) {
      let newLinks = values.links;
      newLinks[parseInt(event.target.id.charAt(4))] = {
        name: event.target.name,
        url: event.target.value
      };
      setValues({
        ...values,
        links: newLinks
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const addLink = name => {
    if (name) {
      let newLinks = values.links;
      if (newLinks)
        newLinks.push({
          // _id: null,
          name: name,
          url: null
        });
      else {
        newLinks = [{ _id: null, name: name, url: null }];
      }

      setValues({
        ...values,
        links: newLinks
      });
      setIsExpanded({ ...isExpanded, [name]: true });
      setLinkEdit({ ...linkEdit, [name]: true });
    }
  };

  const handleConfirm = (status, name) => {
    if (status === 'delete') {
      let newLinks = values.links;
      newLinks = newLinks.filter(link => {
        return link.name != name;
      });
      setValues({
        ...values,
        links: newLinks
      });
    }
  };

  const handleDelete = tagID => {
    let wanted;
    let curr = values.tags;
    curr = curr.filter(tag => {
      if (tag._id === tagID) {
        wanted = tag;
        return false;
      }
      return true;
    });
    setValues({ ...values, tags: curr });
    let rest = restTags;
    rest.push(wanted);
    setRestTags(rest);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  if (!filterVisibility) {
    return (
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  onChange={handleChange}
                  required
                  value={values.bio}
                  variant="outlined"
                  inputProps={{ maxLength: 120 }}
                  multiline
                />
              </Grid>
              {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select admission year"
                  name="admissionYear"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.admissionYear}
                  variant="outlined"
                >
                  {admissionYears.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select graduation year"
                  name="graduationYear"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.graduationYear}
                  variant="outlined"
                >
                  {graduationYears.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select branch"
                  name="branch"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.branch}
                  variant="outlined"
                >
                  {branches.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <br />
            {values.links
              ? values.links.map((link, index) => {
                  return (
                    <Accordion defaultExpanded={isExpanded[link.name]}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                      >
                        <Avatar src={getLogo(link.name)} />
                        <Typography className={classes.heading}>
                          &nbsp;&nbsp;&nbsp;&nbsp;{link.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {linkEdit[link.name] ? (
                          <TextField
                            id={`link${index}`}
                            name={link.name}
                            data-key={index}
                            label={link.name}
                            variant="outlined"
                            className={classes.text}
                            value={link.url}
                            onChange={handleChange}
                          />
                        ) : (
                          <Table className={classes.link}>
                            <TableBody>
                              <TableRow>
                                <TableCell style={{ border: 0 }}>
                                  <Link href={link.url} target="_blank">
                                    {link.url}
                                  </Link>
                                </TableCell>
                                <TableCell
                                  style={{ display: 'flex', border: 0 }}
                                  align="right"
                                >
                                  <ConfirmDialog
                                    status={el => {
                                      handleConfirm(el, link.name);
                                    }}
                                  />
                                  <IconButton
                                    onClick={() => {
                                      toggleLinkEdit(link.name);
                                    }}
                                  >
                                    <CreateTwoToneIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : null}
            <br />
            <Dialog addIt={addLink} currentLinks={values.links} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 0, fontSize: 18 }} align="center">
                    Current Tags:
                  </TableCell>
                  <TableCell style={{ border: 0 }} align="left">
                    {values.tags && values.tags.length != 0 ? (
                      values.tags.map((tag, index) => {
                        return (
                          <Chip
                            size="small"
                            label={tag.name}
                            onDelete={() => {
                              handleDelete(tag._id);
                            }}
                            color="primary"
                            variant="outlined"
                          />
                        );
                      })
                    ) : (
                      // <p>
                      //   <i>You have no tags updated. Add tags to see them.</i>
                      // </p>
                      <Chip label="You have no tags updated. Add tags to see them." />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: 0 }} align="center"></TableCell>
                  <TableCell style={{ border: 0, padding: 0 }} align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={displayFilterPane}
                    >
                      <AddIcon />
                      Add Tag
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => updateProfile(values)}
            >
              Update
            </Button>
          </Box>
        </Card>
      </form>
    );
  }
  return (
    <Box mt={3}>
      <Card>
        <CardContent style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {sortedTags.map((group, index) => {
                    return (
                      <TagGroup
                        key={index}
                        classes={classes}
                        tagGroup={group.name}
                        tags={group.tags}
                        addToSelected={addToSelected}
                        removeFromSelected={removeFromSelected}
                      />
                    );
                  })}
                  <TableRow>
                    <TableCell align="left" className={classes.cell}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addSelectedTags}
                        style={{ alignSelf: 'left' }}
                      >
                        ADD
                      </Button>
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={hideFilterPane}
                        style={{ alignSelf: 'left' }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
