import styled, { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

export const StyledApp = styled.div`
  max-width: 1200px;
  background: #8080804f;
  margin: 0 auto;
`;
