import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import GoogleLogin from 'react-google-login';
import axios from 'axios';

const successResponseGoogle = response => {
  console.log(response);
  const emailUsed = response.profileObj.email;
  const index = emailUsed.indexOf('@');
  const domain = emailUsed.substr(index);
  // this.setState({
  //   user: response.profileObj.name,
  //   email: response.profileObj.email
  // });

  if (domain !== '@iitbbs.ac.in') {
    alert('Use your iit bbs email id');
    return false;
  } else {
    // console.log(response.tokenId);
    // this.setState({ isLoggedIn: true });
    // this.props.callFunc();
    axios
      .post(
        '/v1/auth/login',
        { tokenId: response.tokenId },
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log('login');
        console.log(response.data);
        // this.setState({ image: response.data.user.image });
      })
      .catch(err => console.log(err));

    return true;
  }
};

const failureResponseGoogle = response => {
  console.log(response);
  alert('Use your IIT BBS email for login');
};

const App = () => {
  const routing = useRoutes(routes);

  const [isLoggedIn, changeIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      ) : (
        <GoogleLogin
          className="google-login"
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login with google"
          isSignedIn={true}
          onSuccess={res => {
            changeIsLoggedIn(successResponseGoogle(res));
          }}
          onFailure={failureResponseGoogle}
          cookiePolicy={'single_host_origin'}
          icon={false}
          theme="dark"
          style={{ fontSize: '40px' }}
        />
      )}
    </div>
  );
};

export default App;
