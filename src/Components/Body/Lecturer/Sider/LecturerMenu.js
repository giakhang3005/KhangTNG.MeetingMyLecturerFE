import { useContext } from "react";
import { Data } from "../../Body";
import { Menu} from "antd";
import {
  DropboxOutlined,
  BellFilled,
  HomeFilled,
  SettingFilled,
  EnvironmentFilled
} from "@ant-design/icons";
import { LogOutBtn } from "../../../../ExtendedFunction/Users";

export const LecturerMenu = () => {
  //Get data from app.js
  const { setMenuOpt } = useContext(Data);

  //Item for menu
  const menuItems = [
    { label: "Home", icon:  <HomeFilled />, key: "lecturerDashboard" },
    { label: "My slots", icon: <DropboxOutlined />, key: "createdSlot" },
    { label: "Booking requests", icon: <BellFilled />, key: "request" },
    { label: "Configurations", icon: <SettingFilled />, key: null, children: [{label: "Locations", icon: <EnvironmentFilled />, key: 'locations'},]}
    // { label: "Configurations", icon: <ControlFilled />, null, [getItem('Locations', 'location')], "group" },
  ];
  //selectedKeys
  return (
    <>
      <Menu
        mode="inline"
        items={menuItems}
        defaultSelectedKeys="lecturerDashboard"
        onClick={(selectedOpt) => {
          setMenuOpt(selectedOpt.key);
        }}
      />

      {/* Logout Btn */}
      <LogOutBtn />
    </>
  );
};
