import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Logout from './Logout';

class Layout extends Component {
  state = {
    isLoggedIn: false,
    user: '',
  };

  successResponseGoogle = (response) => {
    console.log(response);
    
    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf('@');
    const domain = emailUsed.substr(index);

    if (domain !== '@iitbbs.ac.in') {
      alert('Use your iit bbs email id');
    } 
    else {
      this.setState({ isLoggedIn: true });
      this.setState({ user: response.profileObj.name });
      // console.log(response.tokenId);
      axios({
        method:"POST",
        url:"http://127.0.0.1:3000/v1/user/googleLogin",
        data:{tokenId : response.tokenId}
      }).then((response)=>{
        console.log(response);
      }).catch(err=>console.log(err));
    }
  };

  logout = () => {
    console.log(this.state.isLoggedIn);
    this.setState({ isLoggedIn: false });
    console.log(this.state.isLoggedIn);
  };

  failureResponseGoogle = (response) => {
    console.log(response);
    alert('Use your IIT BBS email for login');
  };
  render() {
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
            <Logout onLogout={this.logout} />
            <p>Hello {this.state.user}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Layout;
