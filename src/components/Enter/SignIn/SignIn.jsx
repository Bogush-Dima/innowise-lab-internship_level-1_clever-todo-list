import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: white;
`;

export const SignIn = () => (
  <form>
    <input type="email" placeholder="email" />
    <input type="password" placeholder="password" />
    <Button>Sign In</Button>
  </form>
);
