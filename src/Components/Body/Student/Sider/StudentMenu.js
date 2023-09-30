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
} from "@ant-design/icons";
import { LogOutBtn } from "../../../../ExtendedFunction/Users";

export const StudentMenu = () => {
  //Get data from app.js
  const { menuOpt, setMenuOpt } = useContext(Data);

  //Item for menu
  const menuItems = [
    { label: "Home", icon: <HomeFilled />, key: "studentDashboard" },
    { label: "Search", icon: <SearchOutlined />, key: "subjectSearch" },
    {
      label: "My Meetings",
      icon: <TeamOutlined />,
      key: null,
      children: [
        {
          label: "Upcomming",
          icon: <HourglassFilled />,
          key: "upcommingMeetings",
        },
        { label: "Past", icon: <ClockCircleFilled />, key: "pastMeetings" },
      ],
    },
    { label: "Requests sent", icon: <BellFilled />, key: "sentRequests" },
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
