import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { fireAuth } from 'utils/database';
import { Context } from 'utils/context';
import {
  SIGN_IN,
  SIGN_UP,
  TODOLIST,
  CREATE_TODOS,
  RESET_DATA,
  TOGGLE_CREATE_TODO,
} from 'utils/constants';
import { StyledHeader, StyledCreateNewTodoBtn } from './Styled';

export class Header extends Component {
  static contextType = Context;

  signOut = () => {
    const { dispatch } = this.context;
    dispatch(RESET_DATA);
    fireAuth.signOut();
  };

  clickCreateTodo = () => {
    const { dispatch } = this.context;
    dispatch(TOGGLE_CREATE_TODO, true);
  };

  renderCreateTodosBtn = () => {
    const { clickCreateTodo } = this;
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

  render() {
    const { signOut, renderCreateTodosBtn } = this;

    return (
      <Switch>
        <StyledHeader>
          <Route path={`/${SIGN_IN}`} render={() => <Link to={SIGN_UP}>Sign Up</Link>} />
          <Route path={`/${SIGN_UP}`} render={() => <Link to={SIGN_IN}>Sign In</Link>} />
          <Route
            path={`/${TODOLIST}`}
            render={() => (
              <>
                <Link to={CREATE_TODOS}>Create Todos</Link>
                <Link to={SIGN_IN} onClick={signOut}>
                  Sign Out
                </Link>
              </>
            )}
          />
          <Route
            path={`/${CREATE_TODOS}`}
            render={() => (
              <>
                {renderCreateTodosBtn()}
                <Link to={TODOLIST}>Todo List</Link>
                <Link to={SIGN_IN} onClick={signOut}>
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
