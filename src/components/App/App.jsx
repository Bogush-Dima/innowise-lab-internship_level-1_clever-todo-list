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
        <Route exact path="/signIn" render={() => <Enter method="signIn" />} />
        <Route exact path="/signUp" render={() => <Enter method="signUp" />} />
        <Route exact path="/todolist" component={TodoList} />
        <Route
          exact
          path="/createTodos"
          render={() => <CreateTodos user={fireAuth.currentUser} />}
        />
        <Redirect to="signIn" />
      </Switch>
    </StyledApp>
  </>
);
