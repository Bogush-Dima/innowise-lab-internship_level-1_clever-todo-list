import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { fireAuth } from 'utils/database';
import { StyledHeader } from './Styled';

export const Header = () => {
  const signOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    fireAuth.signOut();
    window.location.pathname = 'signIn';
  };

  return (
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
        <Route
          path="/todolist"
          render={() => (
            <>
              <Link to="createTodos">
                <button type="button">Create Todos</button>
              </Link>
              <Link to="signIn">
                <button onClick={signOut} type="button">
                  Sign Out
                </button>
              </Link>
            </>
          )}
        />
        <Route
          path="/createTodos"
          render={() => (
            <>
              <Link to="todolist">
                <button type="button">Todo List</button>
              </Link>
              <Link to="signIn">
                <button onClick={signOut} type="button">
                  Sign Out
                </button>
              </Link>
            </>
          )}
        />
      </StyledHeader>
    </Switch>
  );
};
