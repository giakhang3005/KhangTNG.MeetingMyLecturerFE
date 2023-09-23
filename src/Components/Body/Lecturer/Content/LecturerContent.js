import { LecturerCreatedSlotHead } from "./LecturerCreatedSlotHead";
import { useContext } from "react";
import { Data } from "../../Body";
import {Empty} from "antd"

export const LecturerContent = () => {
  const { menuOpt } = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* Header */}
        {menuOpt === "createdSlot" ? <LecturerCreatedSlotHead /> : <></>}

        {/* Body */}
        <Empty description="Không có slot"/>
      </div>
    </div>
  );
};
