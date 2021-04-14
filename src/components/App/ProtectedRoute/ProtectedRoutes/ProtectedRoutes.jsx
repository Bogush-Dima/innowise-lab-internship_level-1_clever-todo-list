import React from 'react';
import { Redirect, Route } from 'react-router';

export const ProtectedRoutes = ({ component: Component, user, path }) => (
  <Route
    path={path}
    render={(props) => {
      if (user) {
        return <Component {...props} />;
      }
      return <Redirect to="signIn" />;
    }}
  />
);
