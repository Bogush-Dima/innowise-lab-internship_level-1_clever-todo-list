import React, { Component } from 'react';
import { Context } from 'utils/context';
import {
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

  render() {
    const { todos } = this.context;

    return (
      <section>
        <Calendar />
        <StyledMainWrapper>
          <StyledTodos>
            <StyledTodosTitle>In progress</StyledTodosTitle>
            <StyledTodoList>
              {todos.inProcess.length ? (
                todos.inProcess.map(({ todoName, todoDescription }) => (
                  <StyledTodo>
                    <StyledTodoName>{todoName}</StyledTodoName>
                    <StyledTodoDesc>{todoDescription}</StyledTodoDesc>
                  </StyledTodo>
                ))
              ) : (
                <p>Empty</p>
              )}
            </StyledTodoList>
          </StyledTodos>
          <StyledTodos>
            <StyledTodosTitle>Done</StyledTodosTitle>
            <StyledTodoList>
              {todos.done.length ? (
                todos.done.map(({ todoName, todoDescription }) => (
                  <StyledTodo>
                    <StyledTodoName>{todoName}</StyledTodoName>
                    <StyledTodoDesc>{todoDescription}</StyledTodoDesc>
                  </StyledTodo>
                ))
              ) : (
                <p>Empty</p>
              )}
            </StyledTodoList>
          </StyledTodos>
        </StyledMainWrapper>
      </section>
    );
  }
}
