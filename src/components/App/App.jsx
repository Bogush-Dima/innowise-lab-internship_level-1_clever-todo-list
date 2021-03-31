import React from 'react';
// import { Enter } from 'components/Enter/Enter';
import { TodoList } from 'components/TodoList/TodoList';
// import { CreateTodos } from 'components/CreateTodos/CreateTodos';
import { StyledGlobal, StyledApp } from './Styled';

export const App = () => (
  <>
    <StyledGlobal />
    <StyledApp>
      {/* <Enter /> */}
      <TodoList />
      {/* <CreateTodos /> */}
    </StyledApp>
  </>
);
