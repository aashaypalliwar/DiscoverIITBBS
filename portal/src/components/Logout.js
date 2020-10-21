import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={this.props.onLogout}
      ></GoogleLogout>
    );
  }
}

export default Logout;
