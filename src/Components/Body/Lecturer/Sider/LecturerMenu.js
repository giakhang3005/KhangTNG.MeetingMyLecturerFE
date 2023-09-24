import { useContext } from "react";
import { Data } from "../../Body";
import { Menu} from "antd";
import {
  DropboxOutlined,
  BellFilled,
  HomeFilled,
} from "@ant-design/icons";
import { LogOutBtn } from "../../../../ExtendedFunction/Users";

export const LecturerMenu = () => {
  //Get data from app.js
  const { setMenuOpt } = useContext(Data);

  //Item for menu
  const menuItems = [
    { label: "Your slots", icon: <DropboxOutlined />, key: "createdSlot" },
    { label: "Booking requests", icon: <BellFilled />, key: "request" },
    { label: "Locations", icon: <HomeFilled />, key: "location" },
  ];
  //selectedKeys
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
      <LogOutBtn />
    </>
  );
};
