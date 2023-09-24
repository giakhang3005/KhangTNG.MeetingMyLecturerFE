import { LecturerCreatedSlot } from "./LecturerCreatedSlot";
import { useContext } from "react";
import { Data } from "../../Body";


export const LecturerContent = () => {
  const { menuOpt } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "createdSlot" ? <LecturerCreatedSlot /> : <></>}

      </div>
    </div>
  );
};
