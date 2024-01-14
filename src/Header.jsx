import { useCalender } from "./CalenderProvider";
import ItamDayIndicator from "./ItamDayIndicator";

function Header() {
  const { currentYear } = useCalender();

  return (
    <header className="header-section">
      <div className="header-section-container">
        <h1 className="app-title">
          ITAM Market Calender for <span>{currentYear}</span>
        </h1>
        <ItamDayIndicator />
      </div>
    </header>
  );
}

export default Header;
