import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Wrapper from './containers/Wrapper/Wrapper'
import 'src/mixins/chartjs';
import { CookiesProvider,withCookies } from 'react-cookie';
import { BrowserRouter } from "react-router-dom";

const App = (props) => {
  return (
    <CookiesProvider>
         <BrowserRouter>
             <Wrapper/>
         </BrowserRouter>
    </CookiesProvider>
   );
};

export default withCookies(App);
