/* eslint-disable react/prop-types */
function Day({ dayOBJ }) {
  const { date, isToday, isItamMarketDay } = dayOBJ;
  return (
    <div
      className={`calender-days--day-container ${
        isToday ? "today-day-container" : ""
      } ${isItamMarketDay ? "itam-day-container" : ""}`}
    >
      <span className="day">{date}</span>
    </div>
  );
}

export default Day;
