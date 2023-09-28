import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "../Components/Body/Lecturer/Lecturer.css";
import { googleLogout } from "@react-oauth/google";
import { Data } from "../Components/Body/Body";
import { useContext } from "react";

export const LogOutBtn = () => {
  // User
  const { setUser, setRole } = useContext(Data);
  //handle log out on click function
  const handleLogout = () => {
    //logout
    googleLogout();
    setUser(null);

    //back to login page
    setRole('')
    
    //message
    message.error({
      content: "Logged out",
      icon: <LogoutOutlined />,
    });
  };
  return (
    <>
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
