import React, { Component } from 'react';
import {
  ENTER_USER,
  SIGN_UP,
  TODOLIST,
  TYPE_PASSWORD,
  TYPE_SUBMIT,
  TYPE_EMAIL,
} from 'utils/constants';
import { Context } from 'utils/context';
import { fireAuth } from 'utils/database';
import { StyledWrapper, StyledForm, StyledInputWrapper, StyledInput, StyledBtn } from './Styled';

export class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', emailErrorMessage: '', passwordErrorMessage: '' };
  }

  changeValue = (event) => {
    event.preventDefault();
    const { type } = event.target;
    this.setState({
      [type]: event.target.value,
      emailErrorMessage: '',
      passwordErrorMessage: '',
    });
  };

  submit = (event) => {
    const { dispatch } = this.context;
    const { method, history } = this.props;
    const { email, password } = this.state;
    event.preventDefault();

    const enterUser = () => {
      if (method === SIGN_UP) {
        return fireAuth.createUserWithEmailAndPassword(email, password);
      }
      return fireAuth.signInWithEmailAndPassword(email, password);
    };

    enterUser()
      .then(({ user }) => {
        dispatch(ENTER_USER, user);
      })
      .then(() => history.push(TODOLIST))
      .catch((error) => {
        const { code, message } = error;
        if (code.search(TYPE_PASSWORD)) {
          this.setState({ passwordErrorMessage: message });
        } else {
          this.setState({ emailErrorMessage: message });
        }
      });
  };

  render() {
    const { changeValue, submit } = this;
    const { method } = this.props;
    const { email, password, emailErrorMessage, passwordErrorMessage } = this.state;

    return (
      <StyledWrapper>
        <StyledForm>
          <StyledInputWrapper message={emailErrorMessage}>
            <StyledInput
              type={TYPE_EMAIL}
              onChange={changeValue}
              value={email}
              placeholder={TYPE_EMAIL}
            />
          </StyledInputWrapper>
          <StyledInputWrapper message={passwordErrorMessage}>
            <StyledInput
              type={TYPE_PASSWORD}
              onChange={changeValue}
              value={password}
              placeholder={TYPE_PASSWORD}
            />
          </StyledInputWrapper>

          <StyledBtn onClick={submit} type={TYPE_SUBMIT}>
            {method === SIGN_UP ? 'Sign Up' : 'Sign In'}
          </StyledBtn>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

Enter.contextType = Context;
