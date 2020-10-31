import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CardContent,
  Chip,
  Divider,
  Table,
  FormControl,
  Select,
  Button,
  Input,
  InputLabel,
  Grid,
  Paper,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Search as SearchIcon } from 'react-feather';
import { filter } from 'lodash';
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

  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const Results = ({ className, customers, tags, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(customers);
  const [selectedTags, setSelectedTags] = useState([]);
  const [presentTags, setPresentTags] = useState(tags);
  const [search, setSearch] = useState('');

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const selectChip = tagSelected => {
    setPresentTags(tags => tags.filter(tag => tag.name !== tagSelected.name));
    setSelectedTags(tags => [...tags, tagSelected]);
  };
  const deleteChip = tagSelected => {
    setSelectedTags(tags => tags.filter(tag => tag.name !== tagSelected.name));
    setPresentTags(tags => [...tags, tagSelected]);
  };
  const searchUserByTag = () => {
    const tagsFiltered = selectedTags.map(tag => {
      return tag._id;
    });
    console.log(tagsFiltered);
    const data = {
      tagsSelected: tagsFiltered
    };
    axios
      .post('http://localhost:3000/api/v1/search/tags', data, {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data.data.users);
        if (response.data.data.users.length) setUsers(response.data.data.users);
        else setUsers([]);
      })
      .catch(err => console.log(err));
  };
  const searchUser = async event => {
    await setSearch(event.target.value);
    filterResults();
  };

  const filterResults = () => {
    let filterUsers = customers.filter(user => {
      return (
        user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    setUsers(filterUsers);
  };
  // const users = {customers};
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              {/* <Grid item md={5} xs={12}>
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
                  placeholder="Search User by name or email"
                  variant="outlined"
                />
              </Grid> */}
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={searchUserByTag}
                        >
                          Published Users
                        </Button>
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={searchUserByTag}
                        >
                          Unpublished users
                        </Button>
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={searchUserByTag}
                        >
                          Reported Users
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
      <br></br>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * limit, (page + 1) * limit).map(customer => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar className={classes.avatar} src={customer.image}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>

                    {/* <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
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
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
