import { LecturerCreatedSlot } from "./MySlot/LecturerCreatedSlot";

import {LecturerDashboard} from "./Home/LecturerDashboard";
import { LecturerLocation } from "./Config/Location/LecturerLocation";
import { useContext } from "react";
import { Data } from "../../Body";

export const LecturerContent = () => {
  const { menuOpt } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "lecturerDashboard" ? (
          <LecturerDashboard />
        ) : menuOpt === "createdSlot" ? (
          <LecturerCreatedSlot />
        ) : // request
        menuOpt === "request" ? (
          <></>
        ) : (
          <LecturerLocation />
        )}
      </div>
    </div>
  );
};
