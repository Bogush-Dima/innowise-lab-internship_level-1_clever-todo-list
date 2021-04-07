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
  position: relative;

  ::before {
    position: absolute;
    content: 'Updating...';
    width: 100%;
    height: 100%;
    background: #ec570052;
    top: 0;
    left: 0;
    display: ${(props) => (props.keyUpdate ? 'flex' : 'none')};
    justify-content: flex-end;
    font-size: 25px;
    font-weight: 600;
    color: #00000094;
    box-sizing: border-box;
    padding-right: 10px;
  }

  :hover {
    cursor: pointer;
  }
`;

export const StyledDoneTodo = styled.p`
  padding: 10px;
  margin-bottom: 20px;
  border: 3px solid #777777b0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  ::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #ffffff85;
  }
`;

export const StyledDoneText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(-6deg);
  padding: 10px 20px;
  padding-right: 15px;
  border: 3px solid #777777b0;
  border-radius: 10px;
  letter-spacing: 5px;
  font-size: 20px;
  color: #777777b0;
  font-weight: 600;
`;

export const StyledName = styled.p`
  padding-left: 10px;
  font-size: 20px;
`;

export const StyledDesc = styled.p`
  padding: 10px;
  margin-left: 20px;
  font-size: 17px;
  background: #ffffff91;
  border-radius: 10px;
`;
