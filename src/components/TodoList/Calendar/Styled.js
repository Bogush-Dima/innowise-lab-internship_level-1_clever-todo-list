import styled from 'styled-components';

export const StyledWrapper = styled.section`
  background: #80808047;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 10px;
`;

export const StyledDaysWrapper = styled.div`
  overflow: auto;
  background: #ffffff7a;
  padding: 30px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledMonth = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
`;

export const StyledDayCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const StyledDay = styled.div`
  margin: 0 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid orange;
  border-radius: 10px;
  height: 110px;
  min-width: 120px;
  padding: 0px 15px;

  :hover {
    cursor: pointer;
  }
`;

export const StyledDotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledInProgressDots = styled.div`
  margin: 0 2px;
  border: 2px solid orange;
  height: 10px;
  width: 10px;
  border-radius: 50px;
`;

export const StyledDoneDots = styled.div`
  margin: 0 2px;
  background: orange;
  height: 10px;
  width: 10px;
  border-radius: 50px;
`;
