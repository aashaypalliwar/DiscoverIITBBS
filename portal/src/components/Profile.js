import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
class Profile extends Component {
  state = {
    email: ' ',
    name: ' ',
    bio: ' ',
    profileClicked: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ email: this.props.email, name: this.props.user });
  }
  getProfile = () => {
    if (!this.state.profileClicked) {
      axios
        .get('/v1/user/profile', {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          this.setState({
            bio: response.data.data.user.bio,
            profileClicked: true,
          });
          this.props.setPic(response.data.data.user.image);
          // document.getElementById('bio').innerText =
          //   'Name : ' + this.state.name;
        })
        .catch((err) => console.log(err));
    } else this.setState({ profileClicked: false });
  };

  render() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <Button variant="info" onClick={this.getProfile}>
          Your Profile
        </Button>
        <div id="bio"></div>
        {this.state.profileClicked ? (
          <div>
            Name : {this.state.name}
            <br></br>
            Email : {this.state.email}
            <br></br>
            Bio : {this.state.bio}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
