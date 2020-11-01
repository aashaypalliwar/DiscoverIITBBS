import React, { Component } from 'react';
import { Container, Grid, withStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import axios from 'axios';
import queryString from 'query-string';

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
    isLoading: true
  };
  getProfile = () => {
    let url = window.location.search;
    // let params = queryString.parse(url);
    // console.log(url);
    axios
      .get('/api/v1/user/other' + url, {
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
  };
  componentDidMount = () => {
    this.getProfile();
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.user);
    return (
      <div>
        {!this.state.isLoading ? (
          <Page className={classes.root} title="Account">
            <Container maxWidth="lg">
              <Grid align="center">
                <Grid item lg={12} md={10} xs={12}>
                  <Profile
                    profile={this.state.user}
                    currentUser={this.props.user}
                    updateProfile={this.getProfile}
                  />
                </Grid>
              </Grid>
            </Container>
          </Page>
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(Account);
