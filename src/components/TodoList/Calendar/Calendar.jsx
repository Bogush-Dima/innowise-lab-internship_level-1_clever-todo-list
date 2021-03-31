import React from 'react';
import {
  StyledDayCard,
  StyledDay,
  StyledWrapper,
  StyledDaysWrapper,
  StyledMonth,
  StyledDotsWrapper,
  StyledInProgressDots,
  StyledDoneDots,
} from './Styled';

export const Calendar = () => {
  const today = new Date(2021, 1, 1);
  const todayYear = today.getFullYear();
  const todayMonthStr = today.toLocaleDateString('en-us', { month: 'long' });
  const todayMonthNum = today.getMonth();
  const todayDate = today.getDate();
  const lastDay = new Date(todayYear, todayMonthNum + 1, 0).getDate();
  const allDaysArr = [];

  for (let i = todayDate; i <= lastDay; i += 1) {
    const obj = {
      date: i,
      day: new Date(todayYear, todayMonthNum, i).toLocaleDateString('en-us', {
        weekday: 'long',
      }),
    };
    allDaysArr.push(obj);
  }

  return (
    <StyledWrapper>
      <StyledMonth>{todayMonthStr}</StyledMonth>
      <StyledDaysWrapper>
        {allDaysArr.map(({ date, day }) => (
          <StyledDayCard>
            <StyledDay>
              <p>{date}</p>
              <p>{day}</p>
            </StyledDay>
            <StyledDotsWrapper>
              <StyledInProgressDots />
              <StyledDoneDots />
            </StyledDotsWrapper>
          </StyledDayCard>
        ))}
      </StyledDaysWrapper>
    </StyledWrapper>
  );
};
