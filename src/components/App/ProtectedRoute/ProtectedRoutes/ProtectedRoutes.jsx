import React from 'react';
import { Redirect, Route } from 'react-router';
import { SIGN_IN } from 'utils/constants';

export const ProtectedRoutes = ({ component: Component, user, path }) => (
  <Route
    path={path}
    render={(props) => {
      if (user) {
        return <Component {...props} />;
      }
      return <Redirect to={SIGN_IN} />;
    }}
  />
);
