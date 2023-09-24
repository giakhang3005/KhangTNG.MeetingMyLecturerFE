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
            <ul>
              <li>{weekDate.day}</li>
              <li className="LecturerSelectedDates" key={i}>
                {weekDate.date}
              </li>
            </ul>
          ) : (
            // others
            <ul>
              <li>{weekDate.day}</li>
              <li key={i}>{weekDate.date}</li>
            </ul>
          );
        })}
      </div>
      {/* Not Slot display */}
      <Empty description="Không có slot" />
    </>
  );
};
