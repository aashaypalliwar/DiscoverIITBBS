import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

import './Logout.css';

const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="logout">
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={this.props.onLogout}
      ></GoogleLogout>
      <img src={this.props.img}></img>
    </div>
      
    );
  }
}

export default Logout;
