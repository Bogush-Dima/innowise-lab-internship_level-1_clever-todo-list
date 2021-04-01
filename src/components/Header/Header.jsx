import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { StyledHeader } from './Styled';

export const Header = () => (
  <Switch>
    <StyledHeader>
      <Route
        path="/signIn"
        render={() => (
          <Link to="signUp">
            <button type="button">Sign Up</button>
          </Link>
        )}
      />
      <Route
        path="/signUp"
        render={() => (
          <Link to="signIn">
            <button type="button">Sign In</button>
          </Link>
        )}
      />
    </StyledHeader>
  </Switch>
);
