import React from 'react';
import {
  StyledMainWrapper,
  StyledTodos,
  StyledTodosTitle,
  StyledTodoList,
  StyledTodo,
} from './Styled';
import { Calendar } from './Calendar/Calendar';

export const TodoList = () => (
  <section>
    <Calendar />
    <StyledMainWrapper>
      <StyledTodos>
        <StyledTodosTitle>In progress</StyledTodosTitle>
        <StyledTodoList>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
        </StyledTodoList>
      </StyledTodos>
      <StyledTodos>
        <StyledTodosTitle>Done</StyledTodosTitle>
        <StyledTodoList>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
          <StyledTodo>Todo</StyledTodo>
        </StyledTodoList>
      </StyledTodos>
    </StyledMainWrapper>
  </section>
);
