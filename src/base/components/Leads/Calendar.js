import { useState } from 'react';
import { FlexWrapper } from 'base/styled';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import calendar from 'assets/images/calendar.svg';
import { setFiltersData } from 'store/slices/leads';
import 'react-datepicker/dist/react-datepicker.css';
import { func } from 'prop-types';

const FlexWrapperCalendar = styled(FlexWrapper)`
  &&& {
    justify-content: space-between;
    .start,
    .end {
      font-family: ${(props) => props.theme.fonts.main};
      font-size: 12px;
      width: 125px;
      padding: 10px 10px 10px 38px;
      color: ${(props) => props.theme.colors.accentRed};
      background: #fff url(${calendar}) 15px 10px no-repeat;
      border: ${(props) => props.theme.borders.calendarBorder};
      border-radius: 7px;
      margin: 0 3px;
    }
    .react-datepicker-popper {
      z-index: 3;
    }
    .react-datepicker {
      font-family: ${(props) => props.theme.fonts.main};
      font-size: 14px;
      border: ${(props) => props.theme.borders.textInput};
      border-radius: 8px;
      .react-datepicker__navigation {
        top: 34px;
      }
      .react-datepicker__navigation--previous {
        right: 54px;
        left: auto;
      }
      .react-datepicker__day--keyboard-selected:hover,
      .react-datepicker__month-text--keyboard-selected:hover,
      .react-datepicker__quarter-text--keyboard-selected:hover,
      .react-datepicker__year-text--keyboard-selected:hover,
      .react-datepicker__day--selected:hover,
      .react-datepicker__day--in-selecting-range:hover,
      .react-datepicker__day--in-range:hover,
      .react-datepicker__month-text--selected:hover,
      .react-datepicker__month-text--in-selecting-range:hover,
      .react-datepicker__month-text--in-range:hover,
      .react-datepicker__quarter-text--selected:hover,
      .react-datepicker__quarter-text--in-selecting-range:hover,
      .react-datepicker__quarter-text--in-range:hover,
      .react-datepicker__year-text--selected:hover,
      .react-datepicker__year-text--in-selecting-range:hover,
      .react-datepicker__year-text--in-range:hover,
      react-datepicker__day--selected,
      .react-datepicker__day--today,
      .react-datepicker__day--keyboard-selected {
        background-color: #f966525e;
        border-radius: 50%;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--selected,
      .react-datepicker__month-text--in-selecting-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--selected,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--selected,
      .react-datepicker__year-text--in-selecting-range,
      .react-datepicker__year-text--in-range {
        background-color: ${(props) => props.theme.colors.accentRed};
        border-radius: 50%;
      }
      .react-datepicker__navigation--next {
        right: 22px;
      }

      .react-datepicker__navigation-icon::before {
        width: 6px;
        height: 6px;
        border-color: #010101;
      }

      .react-datepicker__triangle {
        margin: 0;
        z-index: -9;
      }
      .react-datepicker__current-month {
        padding: 0 0 20px 5px;
      }
      .react-datepicker__header {
        text-align: left;
        background: inherit;
        padding: 35px 40px 0;
        font-size: inherit;
        border-bottom: 0;
      }
      .react-datepicker__day-names {
        font-weight: 600;
      }
      .react-datepicker__month {
        margin-bottom: 20px;
      }
    }
  }
`;

const Calendar = ({setStartDay, setEndDay}) => {
  const [startDate, setStartDate] = useState(new Date().setDate(new Date().getDate() - 30));
  const [endDate, setEndDate] = useState(new Date());

  function handleStartDay(date){
    setStartDate(date);
    setFiltersData({startDate: date});
    setStartDay(date.toISOString().substring(0, 10));
  }

  function handleEndDay(date){
    setEndDate(date);
    setFiltersData({endDate: date});
    setEndDay(date.toISOString().substring(0, 10));
  }

  return (
    <FlexWrapperCalendar>
      <DatePicker
        className="start"
        selected={startDate}
        dateFormat="MMM d, yyyy"
        format='yyyy-MM-dd' 
        onChange={handleStartDay}
        selectsStart
        startDate={startDate}
      />
      <DatePicker
        selected={endDate}
        className="end"
        dateFormat="MMM d, yyyy"
        onChange={handleEndDay}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </FlexWrapperCalendar>
  );
};

export default Calendar;

Calendar.propTypes = {
  setStartDay: func, 
  setEndDay:func
};
