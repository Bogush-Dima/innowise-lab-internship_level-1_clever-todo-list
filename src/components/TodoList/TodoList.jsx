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

  componentDidMount() {
    const { dispatch } = this.context;
    dispatch('enter', JSON.parse(localStorage.getItem('user')));
  }

  render() {
    const { todos, db, user } = this.context;

    const clickDone = (event, key, date, done) => {
      event.preventDefault();
      db.ref(`/${user.email.replace('.', '_')}/${date}`)
        .child(key)
        .update({ done: !done });
    };

    return (
      <section>
        <Calendar />
        <StyledMainWrapper>
          <StyledTodos>
            <StyledTodosTitle>In progress</StyledTodosTitle>
            <StyledTodoList>
              {todos.length ? (
                todos.map(({ todoName, todoDescription, key, done, date }) =>
                  !done ? (
                    <StyledTodo key={key}>
                      <StyledTodoName
                        onClick={(event) => clickDone(event, key, date, done)}
                        done="transparent"
                      >
                        {todoName}
                      </StyledTodoName>
                      <StyledTodoDesc>{todoDescription}</StyledTodoDesc>
                    </StyledTodo>
                  ) : (
                    ''
                  )
                )
              ) : (
                <p>Empty</p>
              )}
            </StyledTodoList>
          </StyledTodos>
          <StyledTodos>
            <StyledTodosTitle>Done</StyledTodosTitle>
            <StyledTodoList>
              {todos.length ? (
                todos.map(({ todoName, todoDescription, key, done, date }) =>
                  done ? (
                    <StyledTodo key={key}>
                      <StyledTodoName
                        onClick={(event) => clickDone(event, key, date, done)}
                        done="orange"
                      >
                        {todoName}
                      </StyledTodoName>
                      <StyledTodoDesc>{todoDescription}</StyledTodoDesc>
                    </StyledTodo>
                  ) : (
                    ''
                  )
                )
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
