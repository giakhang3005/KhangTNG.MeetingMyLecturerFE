import { LecturerCreatedSlot } from "./LecturerCreatedSlot";
import { LecturerRequest } from "./LecturerRequest";
import { LecturerLocation } from "./LecturerLocation";
import { useContext } from "react";
import { Data } from "../../Body";

export const LecturerContent = () => {
  const { menuOpt } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "createdSlot" ? (
          <LecturerCreatedSlot />
        ) : // request
        menuOpt === "request" ? (
          <LecturerRequest />
        ) : (
          <LecturerLocation />
        )}
      </div>
    </div>
  );
};
