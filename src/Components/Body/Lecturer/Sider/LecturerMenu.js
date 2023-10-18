import { useContext, useState } from "react";
import { Data } from "../../Body";
import { Menu, Badge } from "antd";
import {
  DropboxOutlined,
  BellFilled,
  HomeFilled,
  SettingFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import { useLogOut } from "../../../../Hooks/All/useLogout";

export const LecturerMenu = () => {
  //Get data from app.js
  const { menuOpt, setMenuOpt, isDarkMode } = useContext(Data);
  const [titleUpdate, setTitleUpdate] = useState(false);

  const LogOutBtn = useLogOut();

  //Item for menu
  const menuItems = [
    { label: "Home", icon: <HomeFilled />, key: "lecturerDashboard" },
    { label: "My slots", icon: <DropboxOutlined />, key: "createdSlot" },
    {
      label: "",
      icon: (
        <>
          {/* <Badge
            size="small"
            count={9}
            style={Object.assign(
              { position: "absolute" },
              { bottom: 0 },
              { right: "-20px" }
            )}
          /> */}
          <BellFilled />
          <span style={Object.assign({ padding: "0 7px 0 0" })}>
            Booking requests
          </span>
        </>
      ),
      key: "request",
    },
    {
      label: "Configurations",
      icon: <SettingFilled />,
      key: null,
      children: [
        { label: "Locations", icon: <EnvironmentFilled />, key: "locations" },
      ],
    },
    // { label: "Configurations", icon: <ControlFilled />, null, [getItem('Locations', 'location')], "group" },
  ];

  return (
    <>
      <Menu
        mode="inline"
        items={menuItems}
        defaultSelectedKeys="lecturerDashboard"
        selectedKeys={menuOpt}
        onClick={(selectedOpt) => {
          setMenuOpt(selectedOpt.key);
        }}
      />

      {/* Logout Btn */}
      <LogOutBtn />
    </>
  );
};
