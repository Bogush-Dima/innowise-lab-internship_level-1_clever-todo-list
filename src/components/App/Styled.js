import styled, { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    list-style: none;
  }

  button {
    font-size: 17px;
    font-weight: 600;
    padding: 7px 10px;
    min-width: 120px;
    border: 2px solid orange;
    border-radius: 10px;
    background: transparent;
    color: #5d5d5d;
    transition: all .2s ease-in-out;
    outline: none;

    :hover {
      cursor: pointer;
      background: orange;
      color: white
    }
  }

  input, textarea {
    font-size: 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    background: #ffffffc7;
  }
`;

export const StyledApp = styled.div`
  max-width: 1200px;
  background: #8080804f;
  margin: 0 auto;
`;
