import { useContext } from "react";
import { Data } from "../../Body";
import { GetWeek, getNextDate } from "../../../../ExtendedFunction/Date";

export const LecturerContent = () => {
  const { menuOpt, selectedDate, selectedWeek } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        <ul>
          <li>Selected Opt: {menuOpt}</li>
          {/* <li>selected date: {selectedDate}</li> */}
          <li>
            <h3>Selected week (base on selected date):</h3>
          </li>
          {selectedWeek.map((date, i) => {
            return (selectedDate === date) ? <li style={{color: 'orange'}} key={i}>{date}</li> : <li key={i}>{date}</li>
          })}
        </ul>
      </div>
    </div>
  );
};
