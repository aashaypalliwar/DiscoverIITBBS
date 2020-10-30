import React, { Component } from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import axios from 'axios';

import './Profile.css';

class Profile extends Component {
  state = {
    user: null,
    profileClicked: false,
    updateClicked: false,
    dataLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  getProfileFromDB = () => {
    axios
      .get('/api/v1/user/profile', {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        this.setState({
          user: response.data.data.user,
          dataLoaded: true,
        });
        console.log(this.state.user);
        document.getElementById('spinner').classList.remove('loader');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log(this.props.role);
    if (this.props.role) this.getProfileFromDB();
    else {
      const user = {
        name: this.props.user,
        email: this.props.email,
      };
      this.setState({ user: user, dataLoaded: true });
      document.getElementById('spinner').style.display = 'none';
    }
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
  updateProfile = () => {
    let bio = document.querySelector('.bio').value;
    axios
      .patch('/api/v1/user/profile', { bio }, { withCredentials: true })
      .then((response) => {
        alert('Sucessfully Updated');
        this.setState({ updateClicked: false });
        document.getElementById('spinner').classList.add('loader');
        this.getProfileFromDB();
      })
      .catch((err) => {
        alert('Failed to Update');
      });
  };

  render() {
    return (
      <div className="profile">
        <h1>Hello {this.props.user}</h1>
        <Button
          variant="contained"
          onClick={this.getProfile}
          disabled={!this.state.dataLoaded}
        >
          Your Profile
        </Button>
        &nbsp;
        <Button
          variant="warning"
          onClick={this.getUpdateForm}
          disabled={!this.state.dataLoaded}
        >
          Update Profile
        </Button>
        {this.state.profileClicked ? (
          <div className="profile-card">
            <div className="profile-pic">
              <img src={this.state.user.image}></img>
            </div>
            <div className="profile-data">
              <Card className="profCard">
                <Card.Body>
                  <table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{this.state.user.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{this.state.user.email}</td>
                      </tr>
                      <tr>
                        <th>Bio</th>
                        <td>{this.state.user.bio}</td>
                      </tr>
                      <tr>
                        <th>Tags</th>
                        <td className="tags-chips">
                          {this.state.user.Tags
                            ? this.state.user.Tags.map((tag, index) => {
                                return (
                                  <div className="chip" key={index}>
                                    {tag.name}
                                  </div>
                                );
                              })
                            : null}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </div>
          </div>
        ) : null}
        {this.state.updateClicked ? (
          <div className="update-form">
            <Form className="updateForm">
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
                    className="bio"
                    defaultValue={this.state.user.bio}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  <b>Tags</b>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="~ TO BE IMPLEMENTED ~"
                  />
                </Col>
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              type="submit"
              onClick={this.updateProfile}
            >
              Update
            </Button>
          </div>
        ) : null}
        <div className="loader" id="spinner"></div>
      </div>
    );
  }
}

export default Profile;
