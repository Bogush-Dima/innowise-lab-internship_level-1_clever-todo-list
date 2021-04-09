import React, { Component } from 'react';
import { CLICK_DAY } from 'utils/constants';
import { Context } from 'utils/context';
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

export class Calendar extends Component {
  static contextType = Context;

  componentDidUpdate() {
    return null;
  }

  render() {
    const { dispatch, user, checkedDay } = this.context;
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonthStr = today.toLocaleDateString('en-us', { month: 'long' });
    const todayMonthNum = today.getMonth();
    const todayDate = today.getDate();
    const lastDay = new Date(todayYear, todayMonthNum + 1, 0).getDate();
    const allDaysArr = [];
    const daysWithInProcessTodos = [];
    const daysWithDoneTodos = [];

    const toDateStr = (date) => {
      const dateStr = date.toLocaleDateString();
      const arr = dateStr.split('/');
      const newArr = arr.map((num) => (+num < 10 ? `0${num}` : num));
      const res = `${newArr[2]}-${newArr[0]}-${newArr[1]}`;
      return res;
    };

    for (let i = todayDate; i <= lastDay; i += 1) {
      const thisDate = new Date(todayYear, todayMonthNum, i);

      const obj = {
        key: Number(thisDate),
        date: i,
        day: thisDate.toLocaleDateString('en-us', {
          weekday: 'long',
        }),
        dateStr: toDateStr(thisDate),
      };
      allDaysArr.push(obj);
    }

    if (user) {
      fireDB.ref(`/${user.email.replace('.', '_')}`).on('value', (snapShot) => {
        snapShot.forEach((obj) => {
          const val = obj.val();
          const dest = Object.values(val);
          dest.forEach((el) =>
            el.done ? daysWithDoneTodos.push(el.date) : daysWithInProcessTodos.push(el.date)
          );
        });
      });
    }

    const clickDate = (event, key) => {
      const dateId = +event.currentTarget.id;
      const dateStr = new Date(dateId).toLocaleDateString();
      const arr = dateStr.split('/');
      const newArr = arr.map((num) => (+num < 10 ? `0${num}` : num));
      const res = `${newArr[2]}-${newArr[0]}-${newArr[1]}`;

      fireDB
        .ref(`/${fireAuth.currentUser.email.replace('.', '_')}/${res}`)
        .on('value', (snapShot) => {
          // eslint-disable-next-line no-shadow
          const todos = [];
          snapShot.forEach((obj) => {
            todos.push({ key: obj.key, ...obj.val() });
          });
          dispatch(CLICK_DAY, { todos, key });
        });
    };

    const findFun = (elem, dateStr) => elem === dateStr;

    return (
      <StyledWrapper>
        <StyledMonth>{todayMonthStr}</StyledMonth>
        <StyledDaysWrapper>
          {allDaysArr.map(({ key, date, day, dateStr }) => (
            <StyledDayCard id={key} onClick={(event) => clickDate(event, key)} key={key}>
              <StyledDay isChecked={checkedDay === key}>
                <p>{date}</p>
                <p>{day}</p>
              </StyledDay>
              <StyledDotsWrapper>
                {daysWithDoneTodos.some((el) => findFun(el, dateStr)) ? <StyledDoneDots /> : ''}
                {daysWithInProcessTodos.some((el) => findFun(el, dateStr)) ? (
                  <StyledInProgressDots />
                ) : (
                  ''
                )}
              </StyledDotsWrapper>
            </StyledDayCard>
          ))}
        </StyledDaysWrapper>
      </StyledWrapper>
    );
  }
}
