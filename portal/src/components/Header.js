import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={this.props.className}>Discovery Portal</div>;
  }
}

export default Header;
