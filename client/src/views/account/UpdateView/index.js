import React, { Component } from 'react';
import { Container, Grid, withStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
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
    isUpdated: false
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });

    axios
      .get('/api/v1/user/profile', {
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        {!this.state.isLoading ? (
          <Page className={classes.root} title="Account">
            <Container maxWidth="lg">
              <Grid container justify="center">
                <Grid item lg={8} md={6} xs={12}>
                  <ProfileDetails profile={this.state.user} />
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
