import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled.form`
  background: gray;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 70px 35px;
  border-radius: 10px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;

export const StyledBtn = styled.button`
  color: #464646;
  max-width: 40%;
  margin: 0 auto;
  background: #ffffff45;
`;
