import styled from 'styled-components';

export const StyledSection = styled.section`
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  background: #80808040;
  min-height: calc(100vh - 78px);
`;

export const StyledMainUl = styled.ul`
  flex-basis: 65%;
  background: #ffa50040;
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
  max-height: 460px;
`;

export const StyledTextarea = styled.textarea`
  min-width: 300px;
  max-width: 300px;
  min-height: 180px;
  max-height: 180px;
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
  background: #ffffff57;
  border-radius: 10px;
`;

export const StyledDate = styled.p`
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 23px;
  font-weight: 600;
`;

export const StyledTodo = styled.p`
  padding: 10px;
  margin-bottom: 20px;
  border: 3px solid orange;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  ::before {
    position: absolute;
    content: 'Updating...';
    width: 100%;
    height: 100%;
    background: #00000061;
    top: 0;
    left: 0;
    display: ${(props) => (props.keyUpdate ? 'flex' : 'none')};
    justify-content: flex-end;
    font-size: 25px;
    font-weight: 600;
    color: #ffa500de;
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
  margin-bottom: 10px;
  font-weight: 600;
  color: #292929;
`;

export const StyledDesc = styled.p`
  padding: 10px;
  margin-left: 20px;
  font-size: 17px;
  background: #ffffff91;
  border-radius: 10px;
`;

export const StyledSubmitBtn = styled.button`
  color: #464646;
  max-width: 40%;
  margin: 0 auto;
  background: #ffffff45;
`;
