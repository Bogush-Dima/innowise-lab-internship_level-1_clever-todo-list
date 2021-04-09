import React, { Component } from 'react';
import { TOGGLE_CREATE_TODO } from 'utils/constants';
import { Context } from 'utils/context';
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
      nameError: false,
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
      nameError,
    } = this.state;

    const { user, db, createTodo, dispatch } = this.context;

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

      if (!todoName.trim()) {
        this.setState({ nameError: true });
        return;
      }

      await fireDB.ref(`/${user.email.replace('.', '_')}/${date || today()}`).push({
        date: date || today(),
        todoName,
        todoDescription,
        done: false,
      });
      this.setState({ todoName: '', todoDescription: '', date: today() });
      dispatch(TOGGLE_CREATE_TODO, false);
    };

    const changeTodoName = (event) => {
      event.preventDefault();
      this.setState({ todoName: event.target.value, nameError: false });
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
      dispatch(TOGGLE_CREATE_TODO, true);
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

    const clickFormOutside = (event) => {
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

    return (
      <StyledSection>
        <StyledMainUl>
          <StyledTitle>Todo List</StyledTitle>
          {createTodosElements()}
        </StyledMainUl>
        <StyledFormWrapper onMouseDown={clickFormOutside} createTodo={createTodo}>
          <StyledForm onSubmit={submit}>
            <StyledTitle>{!update ? 'Create New Todo' : formTitle}</StyledTitle>
            <StyledInputWrapper nameError={nameError}>
              <StyledInput
                onChange={changeTodoName}
                type="text"
                value={todoName}
                placeholder="Todo Name"
              />
            </StyledInputWrapper>
            <StyledTextarea
              onChange={changeTodoDescription}
              value={todoDescription}
              placeholder="Todo Description"
            />
            <StyledInput onChange={changeDate} type="date" value={date || today()} />
            <StyledSubmitBtn type="submit">{!update ? 'Save' : formBtnVal}</StyledSubmitBtn>
          </StyledForm>
        </StyledFormWrapper>
      </StyledSection>
    );
  }
}
