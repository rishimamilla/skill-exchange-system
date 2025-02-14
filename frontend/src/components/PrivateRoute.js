import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token is found
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
