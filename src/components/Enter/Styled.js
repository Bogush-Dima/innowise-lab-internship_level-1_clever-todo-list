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

export const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  ::before {
    display: ${(props) => (props.message ? 'flex' : 'none')};
    position: absolute;
    content: '${(props) => props.message}';
    padding: 10px;
    box-sizing: border-box;
    top: 100%;
    left: 0;
    width: 100%;
    background: #790000eb;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 15px;
    z-index: 1;
  }
`;

export const StyledInput = styled.input`
  padding: 10px;
`;

export const StyledBtn = styled.button`
  color: #464646;
  max-width: 40%;
  margin: 0 auto;
  background: #ffffff45;
`;
