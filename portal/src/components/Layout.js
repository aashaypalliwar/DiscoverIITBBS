import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Logout from './Logout';

class Layout extends Component {
  state = {
    isLoggedIn: false,
    user: '',
  };

  successResponseGoogle = (response) => {
    console.log(response);
    // const emailUsed = response.nt.Wt;
    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf('@');
    const domain = emailUsed.substr(index);

    if (domain !== '@iitbbs.ac.in') {
      alert('Use your iit bbs email id');
    } else {
      this.setState({ isLoggedIn: true });
      this.setState({ user: response.profileObj.name });
      // alert('Sucessfully logged in ');
      // this.props.history.push('/loggedIn');
    }
  };

  logout = () => {
    console.log(this.state.isLoggedIn);
    this.setState({ isLoggedIn: false });
    console.log(this.state.isLoggedIn);
  };

  failureResponseGoogle = () => {
    alert('Use your IIT BBS email for login');
  };
  render() {
    console.log(this.state.isLoggedIn);
    return (
      <div className="App">
        {!this.state.isLoggedIn ? (
          <GoogleLogin
            clientId="1092979243632-s9pre14t6sels2k5du92781lnr78rkbb.apps.googleusercontent.com"
            buttonText="Login with google"
            isSignedIn={true}
            onSuccess={this.successResponseGoogle}
            onFailure={this.failureResponseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <div>
            <Logout onLogout={this.logout} />
            <p>Hello {this.state.user}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Layout;
