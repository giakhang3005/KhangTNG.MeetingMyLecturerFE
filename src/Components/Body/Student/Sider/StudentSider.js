import "../Student.css";
import { useContext, useState } from "react";
import { Data } from "../../Body";
import { StudentMenu } from "./StudentMenu";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export const StudentSider = () => {
  // Set menu state
  const [menuState, setMenuState] = useState(true);

  return (
    <div className="Sider">
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
          <StudentMenu />
        </>
      )}
    </div>
  );
};
