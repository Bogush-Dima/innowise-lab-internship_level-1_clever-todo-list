import React, { Component } from 'react';
import { fireDB } from 'utils/database';
import { Context } from 'utils/context';
import { changeUserEmail } from 'utils/actions';
import {
  StyledMainSection,
  StyledMainWrapper,
  StyledTodos,
  StyledTodosTitle,
  StyledTodoList,
  StyledTodo,
  StyledTodoName,
  StyledTodoDesc,
} from './Styled';
import { Calendar } from './Calendar/Calendar';

export class TodoList extends Component {
  static contextType = Context;

  clickDone = (event, key, date, done) => {
    const { user } = this.context;
    event.preventDefault();
    fireDB
      .ref(`/${changeUserEmail(user)}/${date}`)
      .child(key)
      .update({ done: !done });
  };

  createTodosElements = (bool) => {
    const { clickDone } = this;
    const { todos } = this.context;
    return todos.map(
      ({ todoName, todoDescription, key, done, date }) =>
        done === bool && (
          <StyledTodo key={key}>
            <StyledTodoName
              onClick={(event) => clickDone(event, key, date, done)}
              done={bool ? 'orange' : 'transparent'}
            >
              {todoName}
            </StyledTodoName>
            <StyledTodoDesc>{todoDescription}</StyledTodoDesc>
          </StyledTodo>
        )
    );
  };

  render() {
    const { createTodosElements } = this;
    const { todos } = this.context;

    return (
      <StyledMainSection>
        <Calendar />
        <StyledMainWrapper>
          <StyledTodos>
            <StyledTodosTitle>In progress</StyledTodosTitle>
            <StyledTodoList>{todos.length ? createTodosElements(false) : null}</StyledTodoList>
          </StyledTodos>
          <StyledTodos>
            <StyledTodosTitle>Done</StyledTodosTitle>
            <StyledTodoList>{todos.length ? createTodosElements(true) : null}</StyledTodoList>
          </StyledTodos>
        </StyledMainWrapper>
      </StyledMainSection>
    );
  }
}

TodoList.contextType = Context;
