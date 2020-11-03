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
    isLoading: true
  };
  getProfile = () => {
    let url = window.location.pathname.split('/');
    let userId = url[2];
    axios
      .get('/api/v1/user/other/?id=' + userId, {
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
    console.log(this.props.history);
    this.getProfile();
  };

  render() {
    const { classes } = this.props;
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
