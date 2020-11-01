import React, { Component } from 'react';
import { Container, Grid, withStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
});

class Account extends Component {
  state = {
    user: [],
    isLoading: true,
    isRestricted: false
  };
  updateProfile = values => {
    this.setState({ isLoading: true });
    const data = { ...values };
    console.log(data);
    axios
      .patch('/api/v1/user/profile', data, {
        withCredentials: true
      })
      .then(response => {
        this.setState({ user: response.data.data.user, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });
    let currentUser = this.props.user;
    if (typeof currentUser == 'string') currentUser = JSON.parse(currentUser);
    if (currentUser.role === 'visitor') {
      this.setState({ isRestricted: true, isLoading: false });
    } else {
      axios
        .get('/api/v1/user/profile', {
          withCredentials: true
        })
        .then(response => {
          // console.log(response.data.data.user);
          this.setState({ user: response.data.data.user, isLoading: false });
          console.log(this.state.user);
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.user);
    return (
      <div>
        {!this.state.isLoading ? (
          !this.state.isRestricted ? (
            <Page className={classes.root} title="Account">
              <Container maxWidth="lg">
                <Grid align="center">
                  <Grid item lg={12} md={10} xs={12}>
                    <Profile profile={this.state.user} />
                  </Grid>
                </Grid>
              </Container>
            </Page>
          ) : (
            <Page className={classes.root} title="Account">
              <Container maxWidth="lg">
                <Grid align="center">
                  <Grid item lg={12} md={10} xs={12}>
                    This page cannot be accessed by visitors
                  </Grid>
                </Grid>
              </Container>
            </Page>
          )
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(Account);
