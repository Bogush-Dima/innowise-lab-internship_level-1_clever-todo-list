import React, { Component } from 'react';
import { ENTER_USER } from 'utils/constants';
import { Context } from 'utils/context';
import { fireAuth } from 'utils/database';
import { StyledWrapper, StyledForm, StyledInputWrapper, StyledInput, StyledBtn } from './Styled';

export class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', emailErrorMessage: '', passwordErrorMessage: '' };
  }

  render() {
    const { method, history } = this.props;
    const { email, password, emailErrorMessage, passwordErrorMessage } = this.state;
    const { dispatch } = this.context;

    const changeValue = (event) => {
      event.preventDefault();
      const { type } = event.target;
      this.setState({
        [type]: event.target.value,
        emailErrorMessage: '',
        passwordErrorMessage: '',
      });
    };

    const submit = (event) => {
      event.preventDefault();

      if (method === 'signUp') {
        fireAuth
          .createUserWithEmailAndPassword(email, password)
          // eslint-disable-next-line no-shadow
          .then(({ user }) => {
            dispatch(ENTER_USER, user);
          })
          .then(() => history.push('todolist'))
          // eslint-disable-next-line no-console
          .catch((error) => {
            const { code, message } = error;
            if (code.search('password')) {
              this.setState({ passwordErrorMessage: message });
            } else {
              this.setState({ emailErrorMessage: message });
            }
          });
      } else {
        fireAuth
          .signInWithEmailAndPassword(email, password)
          // eslint-disable-next-line no-shadow
          .then(({ user }) => {
            dispatch(ENTER_USER, user);
          })
          .then(() => {
            history.push('todolist');
          })
          // eslint-disable-next-line no-console
          .catch((error) => {
            const { code, message } = error;
            if (code.search('password')) {
              this.setState({ passwordErrorMessage: message });
            } else {
              this.setState({ emailErrorMessage: message });
            }
          });
      }
    };

    return (
      <StyledWrapper>
        <StyledForm>
          <StyledInputWrapper message={emailErrorMessage}>
            <StyledInput type="email" onChange={changeValue} value={email} placeholder="email" />
          </StyledInputWrapper>
          <StyledInputWrapper message={passwordErrorMessage}>
            <StyledInput
              type="password"
              onChange={changeValue}
              value={password}
              placeholder="password"
            />
          </StyledInputWrapper>

          <StyledBtn onClick={submit} type="submit">
            {method === 'signUp' ? 'Sign Up' : 'Sign In'}
          </StyledBtn>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

Enter.contextType = Context;
