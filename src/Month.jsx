/* eslint-disable react/jsx-key */
import Day from "./Day";
import OtherDays from "./OtherDays";
import { CALENDER_SPACES } from "./constants";

/* eslint-disable react/prop-types */
function Month({ monthOBJ }) {
  const { title, daysOfThisMonth, lastDateInLastMonth } = monthOBJ;

  function getPrevMonthDates() {
    const prevDatesArr = [];
    const firstDayIndex = daysOfThisMonth[0].dayIndex;

    let lastDate = lastDateInLastMonth;

    while (lastDate > lastDateInLastMonth - firstDayIndex) {
      prevDatesArr.push(lastDate);

      lastDate--;
    }

    return prevDatesArr;
  }
  function getNxtMonthDates(prevDatesArr, currentDatsArr) {
    const numberOfRemainingSpaces =
      CALENDER_SPACES - (prevDatesArr.length + currentDatsArr.length);

    if (numberOfRemainingSpaces < 1) return [];

    const nxtDatesArr = [];

    let curr = 1;

    while (curr <= numberOfRemainingSpaces) {
      nxtDatesArr.push(curr);

      curr++;
    }

    // console.log(nxtDatesArr);

    return nxtDatesArr;
  }

  const prevDates = getPrevMonthDates();
  const nxtDates = getNxtMonthDates(prevDates, daysOfThisMonth);

  return (
    <div className="calender" id={title}>
      <h3 className="calender-month-title">{title}</h3>
      <div className="week-days">
        <span className="week-days--day">Su</span>
        <span className="week-days--day">Mo</span>
        <span className="week-days--day">Tu</span>
        <span className="week-days--day">We</span>
        <span className="week-days--day">Th</span>
        <span className="week-days--day">Fr</span>
        <span className="week-days--day">Sa</span>
      </div>
      <div className="calender-days">
        {prevDates.map((date) => (
          <OtherDays date={date} />
        ))}
        {daysOfThisMonth.map((day) => (
          <Day dayOBJ={day} lastDateInLastMonth={lastDateInLastMonth} />
        ))}
        {nxtDates.map((date) => (
          <OtherDays date={date} />
        ))}
        {/* <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container today-day-container">
          <span className="day">31</span>
        </div>
        <div className="calender-days--day-container itam-day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div>
        <div className="calender-days--day-container">
          <span className="day">1</span>
        </div> */}
      </div>
    </div>
  );
}

export default Month;
