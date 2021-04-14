import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Context } from 'utils/context';
import { fireAuth } from 'utils/database';
import { Enter } from 'components/Enter/Enter';
import { TodoList } from 'components/TodoList/TodoList';
import { CreateTodos } from 'components/CreateTodos/CreateTodos';
import { Header } from 'components/Header/Header';
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
                {user ? (
                  <>
                    <Route
                      path="/todolist"
                      render={(routerProps) => <TodoList {...routerProps} />}
                    />
                    <Route
                      path="/createTodos"
                      render={(routerProps) => (
                        <CreateTodos user={fireAuth.currentUser} {...routerProps} />
                      )}
                    />
                    {/* <Redirect to="todolist" /> */}
                  </>
                ) : (
                  <>
                    <Route
                      path="/signIn"
                      render={(routerProps) => <Enter method="signIn" {...routerProps} />}
                    />
                    <Route
                      path="/signUp"
                      render={(routerProps) => <Enter method="signUp" {...routerProps} />}
                    />
                    <Redirect to="signIn" />
                  </>
                )}
              </Switch>
            </>
          ) : (
            <div>LOADING.......</div>
          )}
        </StyledApp>
      </>
    );
  }
}
