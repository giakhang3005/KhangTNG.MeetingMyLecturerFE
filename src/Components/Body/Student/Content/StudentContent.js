import { useContext } from "react";
import { Data } from "../../Body";
import {StudentDashboard} from "./Home/StudentDashboard"

export const StudentContent = () => {
  const { menuOpt} = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "studentDashboard" ? (
          <StudentDashboard />
        ) : menuOpt === "b" ? (
            <></>
        ) : // request
        menuOpt === "c" ? (
          <></>
        ) : (
          <></>
        )}
      </div>
      
    </div>
  );
};
