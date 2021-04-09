import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { fireAuth } from 'utils/database';
import { Context } from 'utils/context';
import { RESET_DATA, TOGGLE_CREATE_TODO } from 'utils/constants';
import { StyledHeader, StyledCreateNewTodoBtn } from './Styled';

export class Header extends Component {
  static contextType = Context;

  render() {
    const { dispatch } = this.context;

    const signOut = () => {
      dispatch(RESET_DATA);
      fireAuth.signOut();
    };

    const clickCreateTodo = () => {
      dispatch(TOGGLE_CREATE_TODO, true);
    };

    const renderCreateTodosBtn = () => {
      let res;
      if (window.innerWidth < 900) {
        return (
          <StyledCreateNewTodoBtn onClick={clickCreateTodo} type="button">
            Create New Todo
          </StyledCreateNewTodoBtn>
        );
      }
      return res;
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
                {renderCreateTodosBtn()}
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
  }
}
