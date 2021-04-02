import React from 'react';
import { fireAuth, fireDB } from 'utils/database';
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
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonthStr = today.toLocaleDateString('en-us', { month: 'long' });
  const todayMonthNum = today.getMonth();
  const todayDate = today.getDate();
  const lastDay = new Date(todayYear, todayMonthNum + 1, 0).getDate();
  const allDaysArr = [];

  for (let i = todayDate; i <= lastDay; i += 1) {
    const thisDate = new Date(todayYear, todayMonthNum, i);
    const obj = {
      key: Number(thisDate),
      date: i,
      day: thisDate.toLocaleDateString('en-us', {
        weekday: 'long',
      }),
    };
    allDaysArr.push(obj);
  }

  const clickDate = (event) => {
    const dateId = +event.currentTarget.id;
    const dateStr = new Date(dateId).toLocaleDateString();
    const arr = dateStr.split('/');
    const newArr = arr.map((num) => (+num < 10 ? `0${num}` : num));
    const res = `${newArr[2]}-${newArr[0]}-${newArr[1]}`;
    const todos = [];
    fireDB
      .ref(`/${fireAuth.currentUser.email.replace('.', '_')}/${res}`)
      .on('value', (snapShot) => {
        snapShot.forEach((obj) => todos.push(obj.val()));
      });
  };

  return (
    <StyledWrapper>
      <StyledMonth>{todayMonthStr}</StyledMonth>
      <StyledDaysWrapper>
        {allDaysArr.map(({ key, date, day }) => (
          <StyledDayCard id={key} onClick={clickDate} key={key}>
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
