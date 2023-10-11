import { useContext } from "react";
import { Data } from "../../Body";
import { Menu } from "antd";
import {
  SnippetsOutlined,
  HomeFilled,
  SolutionOutlined,
  UserOutlined,
  NotificationOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useLogOut } from "../../../../Hooks/All/useLogout";

export const AdminMenu = () => {
  //Get data from app.js
  const { menuOpt, setMenuOpt } = useContext(Data);
  const LogOutBtn = useLogOut()
  //Item for menu
  const menuItems = [
    { label: "Home", icon: <HomeFilled />, key: "adminDashboard" },
    { label: "Slots", icon: <NotificationOutlined />, key: "slotsManage" },
    {
      label: "Bookings",
      icon: <SnippetsOutlined />,
      key: "bookingsManage",
    },
    {
      label: "Users",
      key: null,
      children: [
        { label: "All", icon: <TeamOutlined />, key: "usersManage" },
        { label: "Lecturers", icon: <SolutionOutlined />, key: "lecturersManage" },
        { label: "Students", icon: <UserOutlined />, key: "studentsManage" },
      ],
      type: "group",
    },
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
