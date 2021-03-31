import React from 'react';
import { StyledDay, StyledWrapper, StyledDaysWrapper, StyledMonth } from './Styled';

export const Calendar = () => {
  const today = new Date();
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
          <StyledDay>
            <p>{date}</p>
            <p>{day}</p>
          </StyledDay>
        ))}
      </StyledDaysWrapper>
    </StyledWrapper>
  );
};
