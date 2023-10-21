import { LecturerCreatedSlot } from "./MySlot/LecturerCreatedSlot";
import { LecturerRequests } from "./Request/LecturerRequests";
import { LecturerDashboard } from "./Home/LecturerDashboard";
import { LecturerLocation } from "./Config/Location/LecturerLocation";
import { useContext, useState } from "react";
import { Data } from "../../Body";
import { LecturerInfo } from "./Config/LecturerInfoConfig/LecturerInfo";


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
            ) : menuOpt === "lecturerInformations" ? (
              <LecturerInfo />
            ) : // request
            menuOpt === "request" ? (
              <LecturerRequests />
            ) : (
              <LecturerLocation />
            )}
          </div>
        </div>
  );
};
