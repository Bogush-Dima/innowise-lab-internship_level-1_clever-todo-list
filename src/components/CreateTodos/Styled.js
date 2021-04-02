import styled from 'styled-components';

export const StyledSection = styled.section`
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  background: #80808040;
`;

export const StyledMainUl = styled.ul`
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

export const StyledDateUl = styled.ul`
  padding: 10px;
  margin-bottom: 20px;
  background: #ffa50075;
  border-radius: 10px;
`;

export const StyledDate = styled.p`
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 23px;
  font-weight: 600;
  border-bottom: 3px solid #00800e3d;
`;

export const StyledTodo = styled.p`
  padding: 10px;
  margin-bottom: 20px;
  border: 3px solid #00800085;
  border-radius: 10px;
`;

export const StyledName = styled.p`
  position: relative;
  padding-left: 20px;
  font-size: 20px;

  ::before {
    position: absolute;
    content: '';
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 7px;
    width: 7px;
    border: 3px solid black;
    border-radius: 50px;
  }
`;

export const StyledDesc = styled.p`
  padding: 10px;
  margin-left: 20px;
  font-size: 17px;
  background: #ffffff91;
  border-radius: 10px;
`;
