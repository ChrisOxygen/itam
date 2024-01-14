import { useCalender } from "./CalenderProvider";

function ItamDayIndicator() {
  const { isLoading, todayIsItamMarketDay, nextItamDay } = useCalender();

  const datify = function (str) {
    if (str.at(-1) === "1") {
      str += "st";
    } else if (str.at(-1) === "2") {
      str += "nd";
    } else if (str.at(-1) === "3") {
      str += "rd";
    } else {
      str += "th";
    }

    return str;
  };

  function displayNextItamDay() {
    return `Next Itam day is ${nextItamDay.day}, ${datify(
      "" + nextItamDay.date
    )} ${nextItamDay.month}`;
  }

  return (
    <h2
      className={`${
        todayIsItamMarketDay ? "animator" : ""
      } itam-market-day-indicator`}
    >
      {!isLoading && todayIsItamMarketDay
        ? `Today is ITAM Market`
        : displayNextItamDay()}
    </h2>
  );
}

export default ItamDayIndicator;
