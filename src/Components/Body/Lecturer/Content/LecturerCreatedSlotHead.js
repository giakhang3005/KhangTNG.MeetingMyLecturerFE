import { useContext } from "react";
import { Data } from "../../Body";
import "../Lecturer.css";

export const LecturerCreatedSlotHead = () => {
  const { selectedDate, selectedWeek } = useContext(Data);
  return (
    <>
      {/* Display days */}
      <ul className="LecturerDays">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>

      {/* Display dates */}
      <ul className="LecturerDates">
        {selectedWeek.map((date, i) => {
          return selectedDate === date ? (
            // add class for selected date
            <li className="LecturerSelectedDates" key={i}>
              {date}
            </li>
          ) : (
            // others
            <li key={i}>{date}</li>
          );
        })}
      </ul>
    </>
  );
};
