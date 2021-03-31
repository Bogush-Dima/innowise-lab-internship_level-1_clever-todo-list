import styled from 'styled-components';

export const StyledWrapper = styled.section`
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px;
`;

export const StyledDaysWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const StyledMonth = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
`;

export const StyledDay = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid orange;
  border-radius: 10px;
  height: 110px;
  padding: 0px 15px;
`;
