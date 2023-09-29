import { useContext } from "react";
import { Data } from "../../Body";

export const StudentContent = () => {
  const { menuOpt} = useContext(Data);
  return (
    <div className="LecturerContent">
      <div className="LecturerShow">
        {/* CreatedSlot */}
        {menuOpt === "a" ? (
          <></>
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
