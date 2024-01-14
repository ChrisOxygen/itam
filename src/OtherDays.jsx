/* eslint-disable react/prop-types */
function OtherDays({ date }) {
  return (
    <div className="calender-days--day-container other-month-days">
      <span className="day">{date}</span>
    </div>
  );
}

export default OtherDays;
