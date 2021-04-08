import React, { Component } from 'react';
import { Context } from 'utils/context';
import { fireDB } from 'utils/database';
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
  StyledDoneTodo,
  StyledDoneText,
  StyledName,
  StyledDesc,
  StyledSubmitBtn,
} from './Styled';

export class CreateTodos extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      todoName: '',
      todoDescription: '',
      date: '',
      formBtnVal: 'Update',
      formTitle: 'Update Todo',
      todoKey: '',
      oldDate: '',
      update: false,
      keyUpdate: '',
    };
  }

  render() {
    const {
      todoName,
      todoDescription,
      date,
      formBtnVal,
      formTitle,
      todoKey,
      oldDate,
      update,
      keyUpdate,
    } = this.state;

    const { user, db } = this.context;

    const today = () => {
      const dateStr = new Date().toLocaleDateString();
      const arr = dateStr.split('/');
      const newArr = arr.map((num) => (+num < 10 ? `0${num}` : num));
      const res = `${newArr[2]}-${newArr[0]}-${newArr[1]}`;
      return res;
    };

    const submit = async (event) => {
      event.preventDefault();
      if (update) {
        await fireDB.ref(`/${user.email.replace('.', '_')}/${oldDate}/${todoKey}`).remove();
        this.setState({ update: false });
      }

      await fireDB.ref(`/${user.email.replace('.', '_')}/${date || today()}`).push({
        date: date || today(),
        todoName,
        todoDescription,
        done: false,
      });
      this.setState({ todoName: '', todoDescription: '', date: today() });
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

    // eslint-disable-next-line no-shadow
    const clickTodo = (event, todoName, todoDescription, date, key) => {
      event.preventDefault();
      this.setState({
        todoName,
        todoDescription,
        date,
        formBtnVal: 'Update',
        formTitle: 'Update Todo',
        todoKey: key,
        oldDate: date,
        update: true,
        keyUpdate: key,
      });
    };

    const createTodosElements = () => {
      const datesArr = Object.keys(db);
      return datesArr.map((key) => (
        <StyledDateUl key={key}>
          <StyledDate>{key}</StyledDate>
          <div>
            {
              // eslint-disable-next-line no-shadow
              db[key].map(({ key, todoName, todoDescription, done, date }) =>
                !done ? (
                  <StyledTodo
                    onClick={(event) => clickTodo(event, todoName, todoDescription, date, key)}
                    key={key}
                    keyUpdate={keyUpdate === key}
                  >
                    <StyledName>{todoName}</StyledName>
                    <StyledDesc>{todoDescription}</StyledDesc>
                  </StyledTodo>
                ) : null
              )
            }
          </div>
          <div>
            {
              // eslint-disable-next-line no-shadow
              db[key].map(({ key, todoName, todoDescription, done }) =>
                done ? (
                  <StyledDoneTodo key={key}>
                    <StyledDoneText>DONE</StyledDoneText>
                    <StyledName>{todoName}</StyledName>
                    <StyledDesc>{todoDescription}</StyledDesc>
                  </StyledDoneTodo>
                ) : null
              )
            }
          </div>
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
          <StyledTitle>{!update ? 'Create New Todo' : formTitle}</StyledTitle>
          <StyledInput
            onChange={changeTodoName}
            type="text"
            value={todoName}
            placeholder="Todo Name"
          />
          <StyledTextarea
            onChange={changeTodoDescription}
            value={todoDescription}
            placeholder="Todo Description"
          />
          <StyledInput onChange={changeDate} type="date" value={date || today()} />
          <StyledSubmitBtn type="submit">{!update ? 'Save' : formBtnVal}</StyledSubmitBtn>
        </StyledForm>
      </StyledSection>
    );
  }
}
