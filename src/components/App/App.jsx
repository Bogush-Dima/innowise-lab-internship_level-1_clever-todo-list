import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Context } from 'utils/context';
import { SIGN_IN, SIGN_UP, TODOLIST, CREATE_TODOS } from 'utils/constants';
import { Enter } from 'components/Enter/Enter';
import { TodoList } from 'components/TodoList/TodoList';
import { CreateTodos } from 'components/CreateTodos/CreateTodos';
import { Header } from 'components/Header/Header';
import { Loader } from 'components/Loader/Loader';
import { ProtectedRoutes } from './ProtectedRoute/ProtectedRoutes/ProtectedRoutes';
import { StyledGlobal, StyledApp } from './Styled';

export class App extends Component {
  static contextType = Context;

  render() {
    const { userLoaded, user } = this.context;

    return (
      <>
        <StyledGlobal />
        <StyledApp>
          {userLoaded ? (
            <>
              <Header />
              <Switch>
                <ProtectedRoutes path={`/${TODOLIST}`} component={TodoList} user={user} />
                <ProtectedRoutes path={`/${CREATE_TODOS}`} component={CreateTodos} user={user} />
                <Route
                  path={`/${SIGN_IN}`}
                  render={(routerProps) => <Enter method="signIn" {...routerProps} />}
                />
                <Route
                  path={`/${SIGN_UP}`}
                  render={(routerProps) => <Enter method="signUp" {...routerProps} />}
                />
                <Redirect to={user ? 'todolist' : 'signIn'} />
              </Switch>
            </>
          ) : (
            <Loader />
          )}
        </StyledApp>
      </>
    );
  }
}
