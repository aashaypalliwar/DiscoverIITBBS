import React from 'react';
import { useRoutes, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import setUserAsProps from 'src/routes';

const Layout = props => {
  const routes = setUserAsProps(props.user, props.cookies);
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default Layout;
