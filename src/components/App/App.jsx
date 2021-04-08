import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { fireAuth } from 'utils/database';
import { Enter } from 'components/Enter/Enter';
import { TodoList } from 'components/TodoList/TodoList';
import { CreateTodos } from 'components/CreateTodos/CreateTodos';
import { Header } from 'components/Header/Header';
import { StyledGlobal, StyledApp } from './Styled';

export const App = () => (
  <>
    <StyledGlobal />
    <StyledApp>
      <Header />
      <Switch>
        <Route
          path="/signIn"
          render={(routerProps) => <Enter method="signIn" {...routerProps} />}
        />
        <Route
          path="/signUp"
          render={(routerProps) => <Enter method="signUp" {...routerProps} />}
        />
        <Route path="/todolist" render={(routerProps) => <TodoList {...routerProps} />} />
        <Route
          path="/createTodos"
          render={(routerProps) => <CreateTodos user={fireAuth.currentUser} {...routerProps} />}
        />
        <Redirect to="signIn" />
      </Switch>
    </StyledApp>
  </>
);
