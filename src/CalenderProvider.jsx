/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { FIRST_ITAM_DAY, MONTHS_OF_YEAR, WEEK_DAYS } from "./constants";

const initialState = {
  currentYear: new Date().getFullYear(),
  isLoading: true,
  monthsData: [],
  todayIsItamMarketDay: false,
  today: {},
  nextItamDay: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "getCalenderData":
      return { ...state, monthsData: action.payload };
    case "loadingComplete":
      return { ...state, isLoading: false };
    case "todayIsItam":
      return { ...state, todayIsItamMarketDay: true };
    case "setToday":
      return { ...state, today: action.payload };
    case "setNextItamDay":
      return { ...state, nextItamDay: action.payload };
    case "reset":
      return initialState;

    default:
      throw new Error("unknown action");
  }
}

const CalenderContext = createContext();

function CalenderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentYear,
    isLoading,
    monthsData,
    todayIsItamMarketDay,
    nextItamDay,
    today,
  } = state;

  useEffect(() => {
    setUpCalender();
    dispatch({ type: "loadingComplete" });
  }, []);

  // useEffect(() => {

  // }, []);

  function setUpCalender() {
    const allItamDays = getAllItamDaysForTheYear();
    const allDaysInCurrentYear = getAllDays(allItamDays);

    // how to know if today is itam market day

    allDaysInCurrentYear.forEach(function (day) {
      if (day.isToday === true) dispatch({ type: "setToday", payload: day });
      if (day.isToday === true && day.isItamMarketDay === true)
        dispatch({ type: "todayIsItam" });
    });

    const allMonths = getAllMonthsInCurrentYear(allDaysInCurrentYear);

    dispatch({ type: "getCalenderData", payload: allMonths });

    // Get next itam day

    const todayIndex = allDaysInCurrentYear.findIndex(
      (day) => day.isToday === true
    );

    const slicedArr = allDaysInCurrentYear.slice(todayIndex + 1);

    const itamDay = slicedArr.find((day) => day.isItamMarketDay === true);

    dispatch({ type: "setNextItamDay", payload: itamDay });
  }

  function getAllItamDaysForTheYear() {
    const allItamDaysForTheYear = [];
    let currItamDay = FIRST_ITAM_DAY;
    while (currItamDay < 365) {
      if (new Date(currentYear, 0, currItamDay).getDay() === 0) {
        allItamDaysForTheYear.push(currItamDay + 1);
      } else {
        allItamDaysForTheYear.push(currItamDay);
      }

      currItamDay += 8;
    }

    if (allItamDaysForTheYear[-1] > 365) allItamDaysForTheYear.pop();

    return allItamDaysForTheYear;
  }

  function getAllDays(allItamDaysArr) {
    const days = [];

    let runningDayNumber = 1;

    while (runningDayNumber <= 365) {
      if (allItamDaysArr.includes(runningDayNumber)) {
        days.push(getDay(runningDayNumber, true));
      } else {
        days.push(getDay(runningDayNumber, false));
      }

      runningDayNumber++;
    }

    return days;
  }

  function getDay(dayNumber, isItamMarketDay) {
    const dayObj = {
      monthIndex: new Date(currentYear, 0, dayNumber).getMonth(),
      date: new Date(currentYear, 0, dayNumber).getDate(),
      dayIndex: new Date(currentYear, 0, dayNumber).getDay(),
      day: WEEK_DAYS[new Date(currentYear, 0, dayNumber).getDay()],
      month: MONTHS_OF_YEAR[new Date(currentYear, 0, dayNumber).getMonth()],
      isItamMarketDay: isItamMarketDay,
      isWeekend: false,
    };
    return {
      ...dayObj,
      isWeekend:
        dayObj.day === "Saturday" || dayObj.day === "Sunday" ? true : false,
      isToday:
        new Date().getMonth() === dayObj.monthIndex &&
        new Date().getDate() === dayObj.date,
    };
  }

  function getAllMonthsInCurrentYear(allDaysInCurrentYear) {
    const getSingleMonth = function (month) {
      const dayOM = [];

      allDaysInCurrentYear.forEach(function (day) {
        if (day.month === month) dayOM.push(day);
      });

      dayOM.sort(function (a, b) {
        return a.date - b.date;
      });

      return {
        monthTitle: month,
        daysOfThisMonth: dayOM,
      };
    };

    const placeHolderArr = MONTHS_OF_YEAR.map(getSingleMonth);

    return placeHolderArr.map(function (month, index, currArr) {
      return {
        title: month.monthTitle,

        daysOfThisMonth: month.daysOfThisMonth,

        lastDateInLastMonth:
          month.monthTitle === "January"
            ? 31
            : currArr[index - 1].daysOfThisMonth.length,
      };
    });
  }

  return (
    <CalenderContext.Provider
      value={{
        currentYear,
        isLoading,
        monthsData,
        todayIsItamMarketDay,
        nextItamDay,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
}

function useCalender() {
  const context = useContext(CalenderContext);

  if (context === undefined)
    throw new Error("CalenderContext was used outside the CalenderProvider");
  return context;
}

export { CalenderProvider, useCalender };

// export default CalenderProvider;
