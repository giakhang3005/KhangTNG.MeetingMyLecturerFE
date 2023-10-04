import { useContext } from "react";
import { Data } from "../../Body";
import { Menu} from "antd";
import {
  SnippetsOutlined,
  HomeFilled,
  SettingFilled,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { LogOutBtn } from "../../../../ExtendedFunction/Users";

export const AdminMenu = () => {
  //Get data from app.js
  const { menuOpt, setMenuOpt } = useContext(Data);

  //Item for menu
  const menuItems = [
    { label: "Home", icon:  <HomeFilled />, key: "adminDashboard" },
    // { label: "My slots", icon: <DropboxOutlined />, key: "createdSlot" },
    // { label: "Booking requests", icon: <BellFilled />, key: "request" },
    { label: "Management", icon: <SettingFilled />, key: null, children: [{label: "Users", icon: <UserOutlined />, key: 'usersManage'}, {label: "Slots", icon: <NotificationOutlined />, key: 'slotsManage'}, {label: "Bookings", icon: <SnippetsOutlined />, key: 'bookingsManage'},]}
    // { label: "Configurations", icon: <ControlFilled />, null, [getItem('Locations', 'location')], "group" },
  ];
  //selectedKeys
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
