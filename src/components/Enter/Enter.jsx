import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fireAuth } from 'utils/database';
import { StyledWrapper, StyledForm, StyledInput } from './Styled';

export class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    const { method } = this.props;
    const { email, password } = this.state;

    const changeEmail = (event) => {
      event.preventDefault();
      this.setState({ email: event.target.value });
    };

    const changePassword = (event) => {
      event.preventDefault();
      this.setState({ password: event.target.value });
    };

    const submit = (event) => {
      event.preventDefault();

      if (method === 'signUp') {
        fireAuth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            window.location.pathname = '/todolist';
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.log(error.message));
      } else {
        fireAuth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            window.location.pathname = '/todolist';
          })
          // eslint-disable-next-line no-console
          .catch((error) => console.log(error.message));
      }
    };

    return (
      <StyledWrapper>
        <StyledForm>
          <StyledInput type="email" onChange={changeEmail} value={email} placeholder="email" />
          <StyledInput
            type="password"
            onChange={changePassword}
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
