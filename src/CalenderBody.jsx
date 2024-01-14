import { useCalender } from "./CalenderProvider";
import Loading from "./Loading";
import Month from "./Month";

function CalenderBody() {
  const { isLoading, monthsData } = useCalender();

  return (
    <main className="main-container">
      <section className="calender-container">
        {isLoading && <Loading />}
        {!isLoading &&
          monthsData.map((month) => (
            <Month key={month.title} monthOBJ={month} />
          ))}
      </section>
    </main>
  );
}

export default CalenderBody;
