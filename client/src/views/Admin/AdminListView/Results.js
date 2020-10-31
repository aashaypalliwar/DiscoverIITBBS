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

  avatar: {
    marginRight: theme.spacing(2)
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
  }
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [unpublishedUsers, setunpublishedUsers] = useState([]);
  const [reportedUsers, setreportedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState('');

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const searchUser = async event => {
  //   await setSearch(event.target.value);
  //   filterResults();
  // };

  // const filterResults = () => {
  //   let filterUsers = customers.filter(user => {
  //     return (
  //       user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
  //       user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
  //     );
  //   });
  //   setUsers(filterUsers);
  // };
  const getAllUnpublishedUsers = () => {
    axios
      .get('/api/v1/admin/unpublished', {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data.data.docs);
        setunpublishedUsers(response.data.data.docs);
        setCurrentPage('unpublished');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getAllReportedUsers = () => {
    axios
      .get('/api/v1/admin/reported', {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data.data.docs);
        setreportedUsers(response.data.data.docs);
        setCurrentPage('reported');
      })
      .catch(err => {
        console.log(err);
      });
  };
  // const users = {customers};
  return (
    <div>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => getAllUnpublishedUsers()}
                        >
                          Unpublished users
                        </Button>
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => getAllReportedUsers()}
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
      {!currentPage == ' ' ? (
        <Card className={clsx(classes.root, className)} {...rest}>
          <PerfectScrollbar>
            <Box minWidth={1050}>
              {currentPage == 'unpublished' ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {unpublishedUsers
                      .slice(page * limit, (page + 1) * limit)
                      .map(customer => (
                        <TableRow
                          hover
                          key={customer.id}
                          selected={
                            selectedCustomerIds.indexOf(customer.id) !== -1
                          }
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
                          <TableCell>{customer.email}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Report count</TableCell>
                      <TableCell>Reporters</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportedUsers
                      .slice(page * limit, (page + 1) * limit)
                      .map(customer => (
                        <TableRow
                          hover
                          key={customer.id}
                          selected={
                            selectedCustomerIds.indexOf(customer.id) !== -1
                          }
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
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.reportCount}</TableCell>
                          <TableCell>
                            {customer.reporters.map((reporter, index) => {
                              console.log(reporter);
                              return <p>{reporter.name}</p>;
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={
              currentPage == 'unpublished'
                ? unpublishedUsers.length
                : reportedUsers.length
            }
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      ) : null}
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
