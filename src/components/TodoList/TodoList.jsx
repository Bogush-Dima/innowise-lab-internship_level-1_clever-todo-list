import React, { Component } from 'react';
import { fireDB } from 'utils/database';
import { Context } from 'utils/context';
import { GET_DB } from 'utils/constants';
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

// eslint-disable-next-line react/prefer-stateless-function
export class TodoList extends Component {
  componentDidMount() {
    const { user, dispatch } = this.context;

    const addKeyToTodoObj = (obj) => {
      const keys = Object.keys(obj);
      const res = keys.map((key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key].key = key;
        return obj[key];
      });
      return res;
    };

    fireDB.ref(`/${user.email.replace('.', '_')}`).on('value', (snapShot) => {
      let result = {};
      snapShot.forEach((el) => {
        const { key } = el;
        const value = el.val();
        result = { ...result, [key]: addKeyToTodoObj(value) };
      });

      dispatch(GET_DB, result);
    });
  }

  render() {
    const { todos, user } = this.context;

    const clickDone = (event, key, date, done) => {
      event.preventDefault();
      fireDB
        .ref(`/${user.email.replace('.', '_')}/${date}`)
        .child(key)
        .update({ done: !done });
    };

    return (
      <StyledMainSection>
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
      </StyledMainSection>
    );
  }
}

TodoList.contextType = Context;
