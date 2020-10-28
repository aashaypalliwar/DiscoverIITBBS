import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const admissionYears = [
  {
    value: 2016,
    label: 2016,
  },
  {
    value: 2017,
    label: 2017,
  },
  {
    value: 2018,
    label: 2018,
  },
  {
    value: 2019,
    label: 2019,
  },
  {
    value: 2020,
    label: 2020,
  },
  
];
const graduationYears = [
  {
    value: 2020,
    label: 2020,
  },
  {
    value: 2021,
    label: 2021,
  },
  {
    value: 2022,
    label: 2022,
  },
  {
    value: 2023,
    label: 2023,
  },
  {
    value: 2024,
    label: 2024,
  },
  
];

const branches = [
  {
    value : 'Computer Science',
    label : 'Computer Science'
  },
  {
    value : 'Electronics and Communication',
    label : 'Electronics and Communication'
  },{
    value : 'Electrical',
    label : 'Electrical'
  },{
    value : 'Mechanical',
    label : 'Mechanical'
  },{
    value : 'Civil',
    label : 'Civil'
  },
  {
    value : 'Metallurgy',
    label : 'Metallurgy'
  }
]

const useStyles = makeStyles(() => ({
  root: {}
}));


const ProfileDetails = ({ profile,update,className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    bio : profile.bio,
    admissionYear : profile.admissionYear || 2016,
    branch:profile.branch,
    graduationYear : profile.graduationYear || 2020,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


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
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                onChange={handleChange}
                required
                value={values.bio}
                variant="outlined"
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
          
            <Grid
              item
              md={6}
              xs={12}
            >
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
                {admissionYears.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
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
                {graduationYears.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
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
                {branches.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick = {()=>update(values)}
          >
            Update 
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
