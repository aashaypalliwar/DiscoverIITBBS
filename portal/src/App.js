import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Layout from './components/Layout';

class App extends Component {
  state = {
    headerClass: 'title',
    layoutClass: 'layout',
  };

  changeClass = () => {
    if (this.state.headerClass === 'title') {
      this.setState({ headerClass: 'title-after-login' });
      this.setState({ layoutClass: 'layout-after-login' });
      document.getElementById('app').style.display = 'block';
    } else {
      this.setState({ headerClass: 'title' });
      this.setState({ layoutClass: 'layout' });
      document.getElementById('app').style.display = 'flex';
    }
  };

  render() {
    return (
      <div className="App" id="app">
        <Header className={this.state.headerClass} />
        <Layout
          className={this.state.layoutClass}
          callFunc={this.changeClass}
        />
      </div>
    );
  }
}

export default App;
