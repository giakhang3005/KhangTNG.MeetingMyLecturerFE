import "../Lecturer.css";
import { useContext, useState } from "react";
import { Data } from "../../Body";
import { LecturerMenu } from "./LecturerMenu";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export const LecturerSider = () => {
  // Set menu state
  const [menuState, setMenuState] = useState(true);

  //get function set selected date
  const { selectedDate, setSelectedDate, setSelectedWeek } = useContext(Data);

  return (
    <div className="Sider">
      {/* Button */}
      <div className="DisplayBtn">
        {/* show/unshow menu */}
        <Button
          className="LecturerShowBtn"
          icon={menuState ? <CloseOutlined /> : <MenuOutlined />}
          onClick={() => setMenuState(!menuState)}
        ></Button>
      </div>

      {/* Menu */}
      {menuState && (
        <>
          {/* Menu */}
          <LecturerMenu />
        </>
      )}
    </div>
  );
};
