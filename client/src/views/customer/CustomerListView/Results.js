import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { clone } from 'ramda';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TagGroup from './TagGroup';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Table,
  Button,
  Input,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  align: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  table: {
    minWidth: 100
  },
  cellB: {
    fontWeight: 500,
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 'fit-content'
  },
  cell: {
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8
  }
}));

const Results = ({ className, customers, tags, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(customers);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [sortedTags, setSortedTags] = useState([]);
  const [processedTags, setProcessTags] = useState(false);
  let navigate = useNavigate();
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const resetSearch = () => {
    setSelectedTags([]);
    setUsers(customers);
  };

  const searchUserByTag = () => {
    const data = {
      tagsSelected: selectedTags
    };
    axios
      .post('/api/v1/search/tags', data, {
        withCredentials: true
      })
      .then(response => {
        if (response.data.data.users.length) setUsers(response.data.data.users);
        else setUsers([]);
        setFilterVisibility(false);
      })
      .catch(err => console.log(err));
  };
  const searchUser = event => {
    if (event.target.value === '') {
      resetSearch();
    } else {
      setSearch(event.target.value);
    }
  };

  useEffect(() => {
    filterResults();
  }, [search]);

  const filterResults = () => {
    let filterUsers = customers.filter(user => {
      return (
        user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    setUsers(filterUsers);
  };

  const displayFilterPane = () => {
    setUsers(customers);
    setSelectedTags([]);
    if (!processedTags) {
      let tagMap = {};
      for (let tag of tags) {
        tagMap[tag.group] = [];
      }
      for (let tag of tags) {
        tagMap[tag.group].push(tag);
      }
      let tagMapArray = [];
      for (let group in tagMap) {
        tagMapArray.push({ name: group, tags: tagMap[group] });
      }
      setSortedTags(tagMapArray);
      setProcessTags(true);
    }
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
    if (index > -1) {
      newSelection.splice(index, 1);
      setSelectedTags(newSelection);
    }
  };

  const getOtherProfile = id => {
    let url = '/user?id=' + id;
    navigate(url);
  };

  return (
    <div>
      {!filterVisibility ? (
        <Box mt={3}>
          <Card>
            <CardContent style={{ padding: 20 }}>
              <Grid container spacing={3}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.cellB}
                        >
                          Filter students by skills, activities and
                          participation. &nbsp; &nbsp;
                          {/* <FilterListIcon color='primary' size='large' cursor='pointer' variant='filled' onClick={displayFilterPane} />
                          <AutorenewIcon cursor='pointer' size='large' variant='filled' onClick={resetSearch} /> */}
                        </TableCell>

                        <TableCell align="right" className={classes.cell}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={displayFilterPane}
                            style={{ alignSelf: 'right' }}
                          >
                            Filter
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={resetSearch}
                            disabled={selectedTags === []}
                            style={{ alignSelf: 'right' }}
                          >
                            Reset
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
      ) : null}
      {filterVisibility ? (
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
                            onClick={searchUserByTag}
                            style={{ alignSelf: 'left' }}
                          >
                            Search
                          </Button>
                          &nbsp; &nbsp;
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
      ) : null}
      {!filterVisibility ? (
        <>
          <br></br>
          <Card className={clsx(classes.root, className)} {...rest}>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Grid item md={7} xs={12}>
                          <Input
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              )
                            }}
                            onChange={searchUser}
                            placeholder="Search student by name or email"
                            variant="outlined"
                          />
                        </Grid>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Verified</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(page * limit, (page + 1) * limit)
                      .map(customer => (
                        <TableRow
                          hover
                          key={customer._id}
                          selected={
                            selectedCustomerIds.indexOf(customer.id) !== -1
                          }
                          onClick={() => getOtherProfile(customer._id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Avatar
                                className={classes.avatar}
                                src={customer.image}
                              >
                                {getInitials(customer.name)}
                              </Avatar>
                              <Typography color="textPrimary" variant="body1">
                                {customer.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {customer.verifyStatus ? (
                              <CheckCircleIcon color="primary" />
                            ) : null}
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={customers.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </>
      ) : null}
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
