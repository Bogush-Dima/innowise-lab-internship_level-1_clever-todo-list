import React from 'react';
import { Athorization } from './Authoriazation/Authorization';
import { SignIn } from './SignIn/SignIn';

export const Enter = () => (
  <>
    <header className="header">Header</header>
    <div className="wrapper">
      <Athorization />
      <SignIn />
    </div>
  </>
);
