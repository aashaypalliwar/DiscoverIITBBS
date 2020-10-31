import React, { Component } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import data from './data';
import axios from 'axios';
const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
});

class CustomerListView extends Component {
  state = {
    isRestricted: true
  };

  componentDidMount = () => {
    let user = this.props.user;
    if (typeof user === 'string') {
      user = JSON.parse(user);
    }

    if (user.role === 'admin' || user.role === 'superAdmin') {
      this.setState({ isRestricted: false });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.state.isRestricted ? (
          <Page className={classes.root} title="Admin">
            <Container maxWidth={false}>
              <Box mt={3}>
                <Results
                  unpublishedUsers={this.state.unpublishedUsers}
                  reportedUsers={this.state.reportedUsers}
                />
              </Box>
            </Container>
          </Page>
        ) : (
          <Page className={classes.root} title="Discover">
            <Container maxWidth={false}>
              <Box mt={3}>This page is only accessed by admins</Box>
            </Container>
          </Page>
        )}
      </div>
    );
  }
}
export default withStyles(useStyles)(CustomerListView);
