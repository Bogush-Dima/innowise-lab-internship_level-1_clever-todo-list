import React, { Component } from 'react';
import { TOGGLE_CREATE_TODO } from 'utils/constants';
import { Context } from 'utils/context';
import { changeUserEmail, formattingDateStrForFirebase } from 'utils/actions';
import { fireDB } from 'utils/database';
import {
  StyledSection,
  StyledFormWrapper,
  StyledForm,
  StyledTextarea,
  StyledTitle,
  StyledInput,
  StyledInputWrapper,
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

  state = {
    todoName: '',
    todoDescription: '',
    date: '',
    formBtnVal: 'Update',
    formTitle: 'Update Todo',
    todoKey: '',
    oldDate: '',
    update: false,
    keyUpdate: '',
    nameError: false,
  };

  submit = async (event) => {
    const { user, dispatch } = this.context;
    const { oldDate, todoKey, update, todoName, date, todoDescription } = this.state;

    event.preventDefault();
    if (update) {
      await fireDB.ref(`/${changeUserEmail(user)}/${oldDate}/${todoKey}`).remove();
      this.setState({ update: false });
    }
    if (!todoName.trim()) {
      this.setState({ nameError: true });
      return;
    }
    await fireDB.ref(`/${changeUserEmail(user)}/${date || formattingDateStrForFirebase()}`).push({
      date: date || formattingDateStrForFirebase(),
      todoName,
      todoDescription,
      done: false,
    });
    this.setState({ todoName: '', todoDescription: '', date: formattingDateStrForFirebase() });
    dispatch(TOGGLE_CREATE_TODO, false);
  };

  changeInputValue = (event, inputName) => {
    event.preventDefault();
    const { nameError } = this.state;
    const { value, type } = event.target;
    this.setState({ [inputName]: value, nameError: type === 'text' ? false : nameError });
  };

  clickTodo = (event, todoName, todoDescription, date, key) => {
    const { dispatch } = this.context;
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
    dispatch(TOGGLE_CREATE_TODO, true);
  };

  createTodosElements = () => {
    const { clickTodo } = this;
    const { db } = this.context;
    const { keyUpdate } = this.state;
    const datesArr = Object.keys(db);
    return datesArr.map((key) => (
      <StyledDateUl key={key}>
        <StyledDate>{key}</StyledDate>
        <div>
          {db[key].map(({ key, todoName, todoDescription, done, date }) =>
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
          )}
        </div>
        <div>
          {db[key].map(({ key, todoName, todoDescription, done }) =>
            done ? (
              <StyledDoneTodo key={key}>
                <StyledDoneText>DONE</StyledDoneText>
                <StyledName>{todoName}</StyledName>
                <StyledDesc>{todoDescription}</StyledDesc>
              </StyledDoneTodo>
            ) : null
          )}
        </div>
      </StyledDateUl>
    ));
  };

  clickFormOutside = (event) => {
    const { dispatch } = this.context;
    const { tagName } = event.target;
    if (tagName === 'DIV') {
      this.setState({
        update: false,
        keyUpdate: '',
        todoName: '',
        todoDescription: '',
        date: '',
      });
      dispatch(TOGGLE_CREATE_TODO, false);
    }
  };

  render() {
    const { submit, changeInputValue, createTodosElements, clickFormOutside } = this;
    const { db, createTodo } = this.context;
    const {
      todoName,
      todoDescription,
      date,
      formBtnVal,
      formTitle,
      update,
      nameError,
    } = this.state;

    return (
      <StyledSection>
        <StyledMainUl>
          <StyledTitle>Todo List</StyledTitle>
          {db ? createTodosElements() : null}
        </StyledMainUl>
        <StyledFormWrapper onMouseDown={clickFormOutside} createTodo={createTodo}>
          <StyledForm onSubmit={submit}>
            <StyledTitle>{!update ? 'Create New Todo' : formTitle}</StyledTitle>
            <StyledInputWrapper nameError={nameError}>
              <StyledInput
                onChange={(event) => changeInputValue(event, 'todoName')}
                type="text"
                value={todoName}
                placeholder="Todo Name"
              />
            </StyledInputWrapper>
            <StyledTextarea
              onChange={(event) => changeInputValue(event, 'todoDescription')}
              value={todoDescription}
              placeholder="Todo Description"
            />
            <StyledInput
              onChange={(event) => changeInputValue(event, 'date')}
              type="date"
              value={date || formattingDateStrForFirebase()}
            />
            <StyledSubmitBtn type="submit">{!update ? 'Save' : formBtnVal}</StyledSubmitBtn>
          </StyledForm>
        </StyledFormWrapper>
      </StyledSection>
    );
  }
}
