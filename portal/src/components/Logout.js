import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GoogleLogout
        clientId="1092979243632-s9pre14t6sels2k5du92781lnr78rkbb.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.props.onLogout}
      ></GoogleLogout>
    );
  }
}

export default Logout;
