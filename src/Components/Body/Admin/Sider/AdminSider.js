import { useState } from "react";
import { AdminMenu } from "./AdminMenu";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export const AdminSider = () => {
  // Set menu state
  const [menuState, setMenuState] = useState(true);

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
          <AdminMenu />
        </>
      )}
    </div>
  );
};
