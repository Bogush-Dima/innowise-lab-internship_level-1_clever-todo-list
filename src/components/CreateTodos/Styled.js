import styled from 'styled-components';

export const StyledSection = styled.section`
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  background: #80808040;
`;

export const StyledUl = styled.ul`
  flex-basis: 65%;
  background: #00800036;
  border-radius: 10px;
  padding: 20px;
`;

export const StyledForm = styled.form`
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #80808040;
  flex-basis: 30%;
  max-height: 350px;
`;

export const StyledTextarea = styled.textarea`
  min-width: 300px;
  max-width: 300px;
  min-height: 50px;
  margin-bottom: 20px;
  padding: 10px;
`;

export const StyledTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;
