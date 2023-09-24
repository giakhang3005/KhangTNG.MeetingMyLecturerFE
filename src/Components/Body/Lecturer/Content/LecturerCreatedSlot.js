import { useContext } from "react";
import { Data } from "../../Body";
import "../Lecturer.css";
import { Empty } from "antd";

export const LecturerCreatedSlot = () => {
  const { selectedDate, selectedWeek } = useContext(Data);
  return (
    <>
      <div className="lecturerCreatedSlots">
        {/* Display dates & days */}
        {/* LecturerSelectedDates */}
        {selectedWeek.map((weekDate, i) => {
          return selectedDate === weekDate.date ? (
            // add class for selected date
            <ul key={i}>
              <li>{weekDate.day}</li>
              <li className="LecturerSelectedDates">
                {weekDate.date}
              </li>
            </ul>
          ) : (
            // others
            <ul key={i}>
              <li>{weekDate.day}</li>
              <li>{weekDate.date}</li>
            </ul>
          );
        })}
      </div>
      {/* Not Slot display */}
      <Empty description="No slot found" />
    </>
  );
};
