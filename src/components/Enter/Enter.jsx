import React, { Component } from 'react';
import { ENTER_USER } from 'utils/constants';
import { Context } from 'utils/context';
import { fireAuth } from 'utils/database';
import { StyledWrapper, StyledForm, StyledInput, StyledBtn } from './Styled';

export class Enter extends Component {
  // static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    const { method, history } = this.props;
    const { email, password } = this.state;
    const { dispatch } = this.context;

    const changeValue = (event) => {
      event.preventDefault();
      const { type } = event.target;
      this.setState({ [type]: event.target.value });
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
          .catch((error) => console.log(error.message));
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
          .catch((error) => console.log(error.message));
      }
    };

    return (
      <StyledWrapper>
        <StyledForm>
          <StyledInput type="email" onChange={changeValue} value={email} placeholder="email" />
          <StyledInput
            type="password"
            onChange={changeValue}
            value={password}
            placeholder="password"
          />
          <StyledBtn onClick={submit} type="submit">
            {method === 'signUp' ? 'Sign Up' : 'Sign In'}
          </StyledBtn>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

Enter.contextType = Context;
