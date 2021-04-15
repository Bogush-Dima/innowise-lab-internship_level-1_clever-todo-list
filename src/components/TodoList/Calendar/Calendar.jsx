import React, { Component } from 'react';
import { CLICK_DAY } from 'utils/constants';
import { Context } from 'utils/context';
import { changeUserEmail, formattingDateStrForFirebase } from 'utils/actions';
import { fireDB } from 'utils/database';
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

  getCurrentMonthStr = () => new Date().toLocaleDateString('en-us', { month: 'long' });

  createAllDaysArr = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthNum = today.getMonth();
    const currentDate = today.getDate();
    const lastDay = new Date(currentYear, currentMonthNum + 1, 0).getDate();
    const allDaysArr = [];

    for (let i = currentDate; i <= lastDay; i += 1) {
      const thisDate = new Date(currentYear, currentMonthNum, i);

      const obj = {
        key: Number(thisDate),
        date: i,
        day: thisDate.toLocaleDateString('en-us', {
          weekday: 'long',
        }),
        dateStr: formattingDateStrForFirebase(thisDate),
      };
      allDaysArr.push(obj);
    }
    return allDaysArr;
  };

  divisionDaysByTasksTypes = () => {
    const { user } = this.context;
    const daysWithInProcessTodos = [];
    const daysWithDoneTodos = [];

    if (user) {
      fireDB.ref(`/${changeUserEmail(user)}`).on('value', (snapShot) => {
        snapShot.forEach((obj) => {
          const val = obj.val();
          const dest = Object.values(val);
          dest.forEach((el) =>
            el.done ? daysWithDoneTodos.push(el.date) : daysWithInProcessTodos.push(el.date)
          );
        });
      });
    }
    return { daysWithInProcessTodos, daysWithDoneTodos };
  };

  clickDate = (event, key) => {
    const { dispatch, user } = this.context;
    const dateId = +event.currentTarget.id;
    const keyForTodos = formattingDateStrForFirebase(new Date(dateId));

    fireDB.ref(`/${changeUserEmail(user)}/${keyForTodos}`).on('value', (snapShot) => {
      const todos = [];
      snapShot.forEach((obj) => {
        todos.push({ key: obj.key, ...obj.val() });
      });
      dispatch(CLICK_DAY, { todos, key });
    });
  };

  findFun = (elem, dateStr) => elem === dateStr;

  render() {
    const {
      getCurrentMonthStr,
      createAllDaysArr,
      divisionDaysByTasksTypes,
      clickDate,
      findFun,
    } = this;
    const { checkedDay } = this.context;
    const { daysWithInProcessTodos, daysWithDoneTodos } = divisionDaysByTasksTypes();

    return (
      <StyledWrapper>
        <StyledMonth>{getCurrentMonthStr()}</StyledMonth>
        <StyledDaysWrapper>
          {createAllDaysArr().map(({ key, date, day, dateStr }) => (
            <StyledDayCard id={key} onClick={(event) => clickDate(event, key)} key={key}>
              <StyledDay isChecked={checkedDay === key}>
                <p>{date}</p>
                <p>{day}</p>
              </StyledDay>
              <StyledDotsWrapper>
                {daysWithDoneTodos.some((el) => findFun(el, dateStr)) ? <StyledDoneDots /> : null}
                {daysWithInProcessTodos.some((el) => findFun(el, dateStr)) ? (
                  <StyledInProgressDots />
                ) : null}
              </StyledDotsWrapper>
            </StyledDayCard>
          ))}
        </StyledDaysWrapper>
      </StyledWrapper>
    );
  }
}
