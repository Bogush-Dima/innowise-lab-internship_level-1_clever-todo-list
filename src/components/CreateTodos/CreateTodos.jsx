import React from 'react';
import {
  StyledSection,
  StyledForm,
  StyledTextarea,
  StyledTitle,
  StyledInput,
  StyledUl,
} from './Styled';

export const CreateTodos = () => {
  const fun = (event) => {
    event.preventDefault();
  };

  return (
    <StyledSection>
      <StyledUl>
        <StyledTitle>Todo List</StyledTitle>
        <li>Todo</li>
        <li>Todo</li>
        <li>Todo</li>
      </StyledUl>
      <StyledForm onSubmit={fun}>
        <StyledTitle>Create New Todo</StyledTitle>
        <StyledInput type="text" placeholder="Todo Name" />
        <StyledTextarea placeholder="Todo Description" />
        <StyledInput type="date" />
        <input type="submit" value="Save" />
      </StyledForm>
    </StyledSection>
  );
};
