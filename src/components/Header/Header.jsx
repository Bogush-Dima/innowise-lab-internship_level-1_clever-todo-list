import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { fireAuth } from 'utils/database';
import { StyledHeader } from './Styled';

export const Header = () => {
  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isChecked');
    fireAuth.signOut();
  };

  return (
    <Switch>
      <StyledHeader>
        <Route path="/signIn" render={() => <Link to="signUp">Sign Up</Link>} />
        <Route path="/signUp" render={() => <Link to="signIn">Sign In</Link>} />
        <Route
          path="/todolist"
          render={() => (
            <>
              <Link to="createTodos">Create Todos</Link>
              <Link to="signIn" onClick={signOut}>
                Sign Out
              </Link>
            </>
          )}
        />
        <Route
          path="/createTodos"
          render={() => (
            <>
              <Link to="todolist">Todo List</Link>
              <Link to="signIn" onClick={signOut}>
                Sign Out
              </Link>
            </>
          )}
        />
      </StyledHeader>
    </Switch>
  );
};
