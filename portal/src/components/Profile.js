import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
class Profile extends Component {
  state = {
    email: ' ',
    name: ' ',
    bio: ' ',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ email: this.props.email, name: this.props.user });
  }
  getProfile = () => {
    axios
      .get('/v1/user/profile', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        this.props.setPic(response.data.data.user.image);
        document.getElementById('bio').innerText =
          'Name : ' + response.data.data.user.name;
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <Button variant="info" onClick={this.getProfile}>
          Your Profile
        </Button>
        <div id="bio"></div>
      </div>
    );
  }
}

export default Profile;
