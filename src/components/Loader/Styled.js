import styled from 'styled-components';

export const StyledLoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLoader = styled.div`
  width: 100px;
  height: 100px;
  border: 30px solid;
  border-color: #e6af2e #1b998b;
  border-radius: 50%;
  animation: spin 1.5s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
