import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

import UpdateView from 'src/views/account/AccountView/UpdateView';

const setUserAsProps = user => {
  // var user = el;
  return [
    {
      path: '/',
      element: <DashboardLayout user={user} />,
      children: [
        { path: 'profile', element: <AccountView user={user} /> },
        { path: 'update', element: <UpdateView user={user} /> },
        { path: 'discover', element: <CustomerListView /> },
        // { path: 'dashboard', element: <DashboardView /> },
        // { path: 'products', element: <ProductListView /> },
        { path: 'settings', element: <SettingsView /> },
        { path: '/', element: <Navigate to="/discover" /> },
        { path: '*', element: <Navigate to="/discover" /> }
      ]
    }
  ];
};
// {
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     { path: 'login', element: <LoginView /> },
//     { path: 'register', element: <RegisterView /> },
//     { path: '404', element: <NotFoundView /> },
//     { path: '/', element:  <Navigate to="/app/dashboard" /> },
//     { path: '*', element: <Navigate to="/404" /> }
//   ]
// }
// ];

export default setUserAsProps;
