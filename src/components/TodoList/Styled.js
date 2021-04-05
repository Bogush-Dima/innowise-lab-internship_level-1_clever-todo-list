import styled from 'styled-components';

export const StyledMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 10px;
`;

export const StyledTodos = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  justify-content: center;
  align-items: center;
`;

export const StyledTodosTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const StyledTodoList = styled.ul`
  background: #ffa50040;
  font-size: 17px;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px 20px;
  border: 3px solid orange;
  border-radius: 10px;
`;

export const StyledTodo = styled.li`
  width: 100%;
  background: #ffffff57;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const StyledTodoName = styled.p`
  padding-left: 40px;
  position: relative;

  ::before {
    position: absolute;
    content: '';
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    height: 15px;
    width: 15px;
    border: 2px solid orange;
    border-radius: 30px;
  }
`;

export const StyledTodoDesc = styled.p`
  padding: 10px;
  margin-top: 4px;
  background: #a5a5a56b;
  border-radius: 10px;
`;
