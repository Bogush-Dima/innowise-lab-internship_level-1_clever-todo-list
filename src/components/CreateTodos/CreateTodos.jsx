import React, { Component } from 'react';
import { Context } from 'utils/context';
import {
  StyledSection,
  StyledForm,
  StyledTextarea,
  StyledTitle,
  StyledInput,
  StyledMainUl,
  StyledDateUl,
  StyledDate,
  StyledTodo,
  StyledName,
  StyledDesc,
} from './Styled';

export class CreateTodos extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { todoName: '', todoDescription: '', date: '', todoList: {} };
  }

  componentDidMount() {
    const { user, db } = this.context;
    if (user.currentUser) {
      db.ref(`/${user.currentUser.email.replace('.', '_')}`).on('value', (snapShot) => {
        const resObj = {};
        snapShot.forEach((childSnapshot) => {
          const { key } = childSnapshot;
          const objects = childSnapshot.val();
          const entr = Object.entries(objects);
          const objArr = entr.map((arr) => {
            const key1 = arr[0];
            const obj = arr[1];
            const res = { key: key1, ...obj };
            return res;
          });
          resObj[key] = objArr;
        });
        this.setState({ todoList: resObj });
      });
    }
  }

  render() {
    const { todoName, todoDescription, date, todoList } = this.state;
    const { user, db } = this.context;

    const getTodos = () => {
      db.ref(`/${user.currentUser.email.replace('.', '_')}`).on('value', (snapShot) => {
        const resObj = {};
        snapShot.forEach((childSnapshot) => {
          const { key } = childSnapshot;
          const objects = childSnapshot.val();
          const entr = Object.entries(objects);
          const objArr = entr.map((arr) => {
            const key1 = arr[0];
            const obj = arr[1];
            const res = { key: key1, ...obj };
            return res;
          });
          resObj[key] = objArr;
        });
        this.setState({ todoList: resObj });
      });
    };

    const submit = async (event) => {
      event.preventDefault();
      await db.ref(`/${user.currentUser.email.replace('.', '_')}/${date}`).push({
        date,
        todoName,
        todoDescription,
        done: false,
      });
      getTodos();
    };

    const changeTodoName = (event) => {
      event.preventDefault();
      this.setState({ todoName: event.target.value });
    };

    const changeTodoDescription = (event) => {
      event.preventDefault();
      this.setState({ todoDescription: event.target.value });
    };

    const changeDate = (event) => {
      event.preventDefault();
      this.setState({ date: event.target.value });
    };

    const createTodosElements = () => {
      const datesArr = Object.keys(todoList);
      return datesArr.map((key) => (
        <StyledDateUl key={key}>
          <StyledDate>{key}</StyledDate>
          {
            // eslint-disable-next-line no-shadow
            todoList[key].map(({ key, todoName, todoDescription }) => (
              <StyledTodo key={key}>
                <StyledName>{todoName}</StyledName>
                <StyledDesc>{todoDescription}</StyledDesc>
              </StyledTodo>
            ))
          }
        </StyledDateUl>
      ));
    };

    return (
      <StyledSection>
        <StyledMainUl>
          <StyledTitle>Todo List</StyledTitle>
          {createTodosElements()}
        </StyledMainUl>
        <StyledForm onSubmit={submit}>
          <StyledTitle>Create New Todo</StyledTitle>
          <StyledInput onChange={changeTodoName} type="text" placeholder="Todo Name" />
          <StyledTextarea onChange={changeTodoDescription} placeholder="Todo Description" />
          <StyledInput onChange={changeDate} type="date" />
          <input type="submit" value="Save" />
        </StyledForm>
      </StyledSection>
    );
  }
}
