import { useContext } from "react";
import { Data } from "../../Body";
import { StudentDashboard } from "./Home/StudentDashboard";
import { SearchSubject } from "./SearchSubject/SearchSubject";
import { RequestsSent } from "./RequestsSent/RequestsSent";
import { Upcomming } from "./MyMeetings/Upcomming";
import { Past } from "./MyMeetings/Past";

export const StudentContent = () => {
  const { menuOpt } = useContext(Data);
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
        ) : menuOpt === "upcommingMeetings" ? (
          <Upcomming />
        ) : menuOpt === "pastMeetings" ? (
          <Past />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
