import { useContext } from "react";
import { Data } from "../Body";
import { Menu, Button, message } from "antd";
import {
  DropboxOutlined,
  BellFilled,
  HomeFilled,
  LogoutOutlined,
} from "@ant-design/icons";

export const LecturerMenu = () => {
  //Get data from app.js
  const { setMenuOpt } = useContext(Data);

  //Log out function
  const handleLogout = () => {
    message.error({
        content: "Logged out",
        icon: <LogoutOutlined />,
    });
  }

  //Item for menu
  const menuItems = [
    { label: "Các slot đã tạo", icon: <DropboxOutlined />, key: "createdSlot" },
    { label: "Yêu cầu", icon: <BellFilled />, key: "request" },
    { label: "Quản lý địa điểm", icon: <HomeFilled />, key: "location" },
  ];

  return (
    <>
      <Menu
        items={menuItems}
        defaultSelectedKeys="createdSlot"
        onClick={(selectedOpt) => {
          setMenuOpt(selectedOpt.key);
        }}
      />

      {/* Logout Btn */}
      <Button
        className="logOutBtn"
        danger
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </>
  );
};
