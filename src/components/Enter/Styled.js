import styled from 'styled-components';

export const StyledWrapper = styled.div`
  height: calc(100vh - 78px);
`;

export const StyledForm = styled.form`
  background: gray;
  width: max-content;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 70px 35px;
  border-radius: 10px;
  margin-top: 30%;
  transform: translateY(-42%);
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
