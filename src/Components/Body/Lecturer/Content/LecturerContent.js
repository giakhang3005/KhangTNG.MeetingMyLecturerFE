import { LecturerCreatedSlot } from "./MySlot/LecturerCreatedSlot";
import { LecturerRequests } from "./Request/LecturerRequests";
import { LecturerDashboard } from "./Home/LecturerDashboard";
import { LecturerLocation } from "./Config/Location/LecturerLocation";
import { useContext, useState } from "react";
import { Data } from "../../Body";
import { LecturerInfo } from "./Config/LecturerInfoConfig/LecturerInfo";
import { ConfigMainPage } from "./Config/ConfigMainPage";


export const LecturerContent = () => {
  const { menuOpt, setMenuOpt } = useContext(Data);
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
            ) : menuOpt === "lecturerCfg" ? (
              <ConfigMainPage setMenuOpt={setMenuOpt} />
            ) : // request
            menuOpt === "request" ? ( 
              <LecturerRequests />
            ) : menuOpt === "locations" ? ( 
              <LecturerLocation setMenuOpt={setMenuOpt} />
            ) :(
              <></>
            )}
          </div>
        </div>
  );
};
