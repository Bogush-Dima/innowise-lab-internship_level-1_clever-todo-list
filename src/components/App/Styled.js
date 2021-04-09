import styled, { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    list-style: none;
  }

  button, a {
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
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      background: orange;
      color: white
    }

    @media(max-width: 460px) {
      font-size: 15px;
      padding: 5px 5px;
      min-width: 90px;
    }
  }

  a {
    margin-right: 10px;

    :last-child {
      margin-right: 0;
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
  min-height: 100%;
  background: #8080804f;
  margin: 0 auto;
`;
