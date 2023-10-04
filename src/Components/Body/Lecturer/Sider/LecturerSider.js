import { useContext, useState } from "react";
import { Data } from "../../Body";
import { LecturerMenu } from "./LecturerMenu";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export const LecturerSider = () => {
  // Set menu state
  const [menuState, setMenuState] = useState(true);
  const {isDarkMode} = useContext(Data);
  return (
    <div style={Object.assign({height: '91.2vh'})} id={isDarkMode && "SideDark"}>
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
    </div>
  );
};
