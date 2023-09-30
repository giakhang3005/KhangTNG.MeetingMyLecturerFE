import { useContext } from "react";
import { Data } from "../../Body";
import {StudentDashboard} from "./Home/StudentDashboard"
import {SearchSubject} from "./SearchSubject/SearchSubject"
import {RequestsSent} from "./RequestsSent/RequestsSent"

export const StudentContent = () => {
  const { menuOpt} = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "studentDashboard" ? (
          <StudentDashboard />
        ) : menuOpt === "subjectSearch" ? (
            <SearchSubject />
        ) : // request
        menuOpt === "sentRequests" ? (
          <RequestsSent />
        ) : (
          <></>
        )}
      </div>
      
    </div>
  );
};
