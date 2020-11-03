import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tab,
  Tabs,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 5,
    margin: 0
  },

  avatar: {
    marginRight: 10
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
  cell: {
    border: 0,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8
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

  let navigate = useNavigate();
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getAllUnpublishedUsers = () => {
    axios
      .get('/api/v1/admin/unpublished', {
        withCredentials: true
      })
      .then(response => {
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
        setreportedUsers(response.data.data.docs);
        setCurrentPage('reported');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) getAllUnpublishedUsers();
    else getAllReportedUsers();
  };

  const getOtherProfile = id => {
    let url = '/user/' + id;
    navigate(url);
  };

  return (
    <div>
      <Box mt={3} className="box">
        <Card align="center" className="card">
          <Paper square className="paper">
            <Tabs
              className="tabs"
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
              centered="true"
            >
              <Tab label="UNPUBLISHED USERS" />
              <Tab label="REPORTED USERS" />
            </Tabs>
          </Paper>
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
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.reportCount}</TableCell>
                          <TableCell>
                            {customer.reporters.map((reporter, index) => {
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
