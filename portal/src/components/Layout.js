import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Logout from './Logout';
import Profile from './Profile.js';
const dotenv = require('dotenv');
dotenv.config({ path: './../.env' });

class Layout extends Component {
  state = {
    isLoggedIn: false,
    user: '',
    email: '',
  };

  successResponseGoogle = (response) => {
    // console.log(response);

    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf('@');
    const domain = emailUsed.substr(index);

    this.setState({
      user: response.profileObj.name,
      email: response.profileObj.email,
    });

    if (domain !== '@iitbbs.ac.in') {
      alert('Use your iit bbs email id');
    } else {
      // console.log(response.tokenId);
      this.setState({ isLoggedIn: true });

      axios
        .post(
          '/v1/user/googleLogin',
          { tokenId: response.tokenId },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
    axios
      .get('/v1/user/logout', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  failureResponseGoogle = (response) => {
    console.log(response);
    alert('Use your IIT BBS email for login');
  };
  render = () => {
    // console.log(`${__dirname}../../.env`);
    // console.log(process.env);
    console.log(this.state.isLoggedIn);
    return (
      <div className="App">
        {!this.state.isLoggedIn ? (
          <GoogleLogin
            clientId="816660866473-jjfs7lqo79i1i6qbg5duffvefe08fgp8.apps.googleusercontent.com"
            buttonText="Login with google"
            isSignedIn={true}
            onSuccess={this.successResponseGoogle}
            onFailure={this.failureResponseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <div>
            <br />
            <Logout onLogout={this.logout} />
            <Profile user={this.state.user} email={this.state.email} />
          </div>
        )}
      </div>
    );
  };
}

export default Layout;
