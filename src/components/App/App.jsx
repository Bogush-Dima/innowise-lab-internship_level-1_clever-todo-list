import React from 'react';
// import { Enter } from 'components/Enter/Enter';
import { TodoList } from 'components/TodoList/TodoList';
// import { CreateTodos } from 'components/CreateTodos/CreateTodos';
import { Header } from 'components/Header/Header';
import { StyledGlobal, StyledApp } from './Styled';

export const App = () => (
  <>
    <StyledGlobal />
    <StyledApp>
      <Header />
      {/* <Enter /> */}
      <TodoList />
      {/* <CreateTodos /> */}
    </StyledApp>
  </>
);
