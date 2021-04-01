import React from 'react';
import PropTypes from 'prop-types';
import { StyledWrapper, StyledForm, StyledInput } from './Styled';

export const Enter = ({ method }) => (
  <StyledWrapper>
    <StyledForm>
      <StyledInput type="email" placeholder="email" />
      <StyledInput type="password" placeholder="password" />
      <button type="button">{method === 'signUp' ? 'Sign Up' : 'Sign In'}</button>
    </StyledForm>
  </StyledWrapper>
);

Enter.propTypes = {
  method: PropTypes.string.isRequired,
};
