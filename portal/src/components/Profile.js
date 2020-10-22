import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
class Profile extends Component {
  state = {
    user: null,
    profileClicked: false,
    updateClicked: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get('/v1/user/profile', {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        this.setState({
          user: response.data.data.user,
        });
        console.log(this.state.user);
      })
      .catch((err) => console.log(err));
  }
  getProfile = () => {
    if (!this.state.profileClicked) {
      this.setState({ profileClicked: true });
      this.setState({ updateClicked: false });
    } else this.setState({ profileClicked: false });
  };
  getUpdateForm = () => {
    if (!this.state.updateClicked) {
      this.setState({ updateClicked: true });
      this.setState({ profileClicked: false });
    } else this.setState({ updateClicked: false });
  };

  render() {
    return (
      <div>
        <h1>Hello {this.props.user}</h1>
        <Button variant="info" onClick={this.getProfile}>
          Your Profile
        </Button>
        &nbsp;
        <Button variant="warning" onClick={this.getUpdateForm}>
          Update Profile
        </Button>
        {this.state.profileClicked ? (
          <div>
            Name : {this.state.user.name}
            <br></br>
            Email : {this.state.user.email}
            <br></br>
            Bio : {this.state.user.bio}
          </div>
        ) : null}
        {this.state.updateClicked ? (
          <div className="update-form">
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  <b>Email</b>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.user.email}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  <b>Name</b>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.user.name}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  <b>Bio</b>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={this.state.user.bio}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  <b>Tags</b>
                </Form.Label>
                <Col sm="9">
                  <Form.Control plaintext defaultValue={this.state.user.bio} />
                </Col>
              </Form.Group>
            </Form>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
