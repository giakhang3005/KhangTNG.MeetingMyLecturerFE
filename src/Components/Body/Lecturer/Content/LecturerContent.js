import { LecturerCreatedSlotHead } from "./LecturerCreatedSlotHead";
import { useContext } from "react";
import { Data } from "../../Body";

export const LecturerContent = () => {
  const { menuOpt } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* Header */}
        {menuOpt === "createdSlot" ? <LecturerCreatedSlotHead /> : <></>}
      </div>
    </div>
  );
};
