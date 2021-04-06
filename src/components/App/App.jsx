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
    return (
      <Route>
        <StyledGlobal />
        <StyledApp>
          <Header />
          <Switch>
            <Route path="/signIn" render={() => <Enter method="signIn" />} />
            <Route path="/signUp" render={() => <Enter method="signUp" />} />
            <Route path="/todolist" component={TodoList} />
            <Route path="/createTodos" render={() => <CreateTodos user={fireAuth.currentUser} />} />
            <Redirect to="signIn" />
          </Switch>
        </StyledApp>
      </Route>
    );
  }
}
