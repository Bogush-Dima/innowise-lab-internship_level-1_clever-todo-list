import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'utils/context';
import { fireAuth } from 'utils/database';
import { StyledWrapper, StyledForm, StyledInput } from './Styled';

export class Enter extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    const { method } = this.props;
    const { email, password } = this.state;
    // const { dispatch } = this.context;

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
          .then(({ user }) => {
            // dispatch('enter', user);
            localStorage.setItem('user', JSON.stringify(user));
          })
          .then(() => {
            window.location.pathname = '/todolist';
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.log(error.message));
      } else {
        fireAuth
          .signInWithEmailAndPassword(email, password)
          .then(({ user }) => {
            // dispatch('enter')
            localStorage.setItem('user', JSON.stringify(user));
          })
          .then(() => {
            window.location.pathname = 'todolist';
            // history.push('todolist');
            // dispatch('newPath')
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
          <button onClick={submit} type="submit">
            {method === 'signUp' ? 'Sign Up' : 'Sign In'}
          </button>
        </StyledForm>
      </StyledWrapper>
    );
  }
}

Enter.propTypes = {
  method: PropTypes.string.isRequired,
};
