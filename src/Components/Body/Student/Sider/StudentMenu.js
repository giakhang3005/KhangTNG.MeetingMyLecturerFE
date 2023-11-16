import { useContext } from "react";
import { Data } from "../../Body";
import { Menu } from "antd";
import {
  SearchOutlined,
  BellFilled,
  HomeFilled,
  TeamOutlined,
  HourglassFilled,
  ClockCircleFilled,
  SettingFilled,
  UserOutlined
} from "@ant-design/icons";
import { useLogOut } from "../../../../Hooks/All/useLogout";

export const StudentMenu = () => {
  //Get data from app.js
  const { menuOpt, setMenuOpt } = useContext(Data);

  const LogOutBtn = useLogOut();

  //Item for menu
  const menuItems = [
    { label: "Home", icon: <HomeFilled />, key: "studentDashboard" },
    {
      label: "Slots",
      icon: <TeamOutlined />,
      key: null,
      children: [
        { label: "Find slots", icon: <SearchOutlined />, key: "subjectSearch" },
        { label: "Requests sent", icon: <BellFilled />, key: "sentRequests" },
      ],
      type: "group",
    },

    {
      label: "My Meetings",
      icon: <TeamOutlined />,
      key: null,
      children: [
        {
          label: "Upcomming Meetings",
          icon: <HourglassFilled />,
          key: "upcommingMeetings",
        },
        { label: "Past Meetings", icon: <ClockCircleFilled />, key: "pastMeetings" },
      ],
      type: "group",
    },
    {
      label: "Settings",
      icon: <SettingFilled />,
      key: null,
      children: [
        {
          label: "Informations",
          icon: <UserOutlined />,
          key: "studentInformations",
        },
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
