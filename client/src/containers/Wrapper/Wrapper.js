import React, { Component } from 'react';
import Layout from './../../layouts/Layout';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Background from './../../images/LoginPage.png';

import { SvgIcon } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    opacity: 0.95,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  layer: {
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    opacity: 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    justLogged: false,
    user: null
  };

  checkIsLoggedIn = () => {
    const cookies = this.props.cookies.cookies;
    this.setState({
      user: cookies.userData,
      isLoggedIn: cookies.isLoggedIn
    });
  };
  componentDidMount = () => {
    this.checkIsLoggedIn();
  };
  successResponseGoogle = response => {
    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf('@');
    const domain = emailUsed.substr(index);

    if (domain !== '@iitbbs.ac.in') {
      alert('Use your IIT Bhubaneswar email id.');
      return false;
    } else {
      axios
        .post(
          '/api/v1/auth/login',
          { tokenId: response.tokenId },
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.setState({ user: response.data.user });
          this.setState({ isLoggedIn: true });
          const userData = {
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            image: response.data.user.image
          };
          const cookies = this.props.cookies;
          cookies.set('userData', userData, {
            path: '/',
            expires: new Date(response.data.expireAt)
          });
          cookies.set('isLoggedIn', true, {
            path: '/',
            expires: new Date(response.data.expireAt)
          });
        })
        .catch(err => console.log(err));
    }
  };
  failureResponseGoogle = response => {
    alert('Use your IIT BBS email for login');
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Layout user={this.state.user} cookies={this.props.cookies} />
        ) : (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={7} className={classes.image}>
              <div className={classes.layer}></div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              component={Paper}
              elevation={6}
              square
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div className={classes.paper}>
                <Typography
                  style={{
                    color: 'black',
                    fontSize: 40,
                    opacity: 1,
                    float: 'right'
                  }}
                >
                  Discover IIT Bhubaneswar
                  <br />
                  <i style={{ fontSize: 20, textAlign: 'right' }}>
                    find right people at the right time
                  </i>
                </Typography>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <GoogleLogin
                    className="google-login"
                    clientId="1092979243632-ufl3842hjal4adoaio73ta2noj2avnbo.apps.googleusercontent.com"
                    render={renderProps => (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={renderProps.onClick}
                        style={{
                          color: 'white',
                          padding: 10,
                          margin: 20
                          // background: '#ccd0dd'
                        }}
                      >
                        <SvgIcon>
                          <path d="M21,12.2177419 C21,13.9112905 20.6311475,15.4233869 19.8934426,16.7540323 C19.1557377,18.0846776 18.1168031,19.1249998 16.7766393,19.875 C15.4364756,20.6250002 13.8934424,21 12.147541,21 C10.4999998,21 8.97540984,20.5947579 7.57377049,19.7842742 C6.17213115,18.9737905 5.05942604,17.8790323 4.23565574,16.5 C3.41188543,15.1209677 3,13.6209679 3,12 C3,10.3790321 3.41188543,8.87903226 4.23565574,7.5 C5.05942604,6.12096774 6.17213115,5.02620949 7.57377049,4.21572581 C8.97540984,3.40524212 10.4999998,3 12.147541,3 C14.5327871,3 16.5737705,3.78629051 18.2704918,5.35887097 L15.7991803,7.71774194 C15.0122953,6.96774175 14.0655738,6.52016129 12.9590164,6.375 C11.9262295,6.22983871 10.9057375,6.375 9.89754098,6.81048387 C8.88934445,7.24596774 8.07786904,7.89919355 7.46311475,8.77016129 C6.79918033,9.71370968 6.46721311,10.7903228 6.46721311,12 C6.46721311,13.0403228 6.72540984,13.9899192 7.24180328,14.8487903 C7.75819672,15.7076615 8.4467215,16.3971776 9.30737705,16.9173387 C10.1680326,17.4374998 11.1147541,17.6975806 12.147541,17.6975806 C13.2540984,17.6975806 14.2254096,17.455645 15.0614754,16.9717742 C15.7254098,16.5846772 16.2786885,16.0645161 16.7213115,15.4112903 C17.0409838,14.8790321 17.2499998,14.3467744 17.3483607,13.8145161 L12.147541,13.8145161 L12.147541,10.6935484 L20.852459,10.6935484 C20.9508199,11.2258066 21,11.7338712 21,12.2177419 Z" />
                        </SvgIcon>
                        &nbsp;&nbsp; Login with Google
                      </Button>
                    )}
                    isSignedIn={true}
                    onSuccess={this.successResponseGoogle}
                    onFailure={this.failureResponseGoogle}
                    cookiePolicy={'single_host_origin'}
                    icon={false}
                    padding={100}
                  />
                </form>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(withCookies(Wrapper));
