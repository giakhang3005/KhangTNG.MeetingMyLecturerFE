import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "../../Components/Body/Lecturer/Lecturer.css";
import { googleLogout } from "@react-oauth/google";
import { Data } from "../../Components/Body/Body";
import { useContext } from "react";

export const useLogOut = () => {
  const LogOutBtn = () => {
    // User
    const { setUser, setRole, user } = useContext(Data);
    //handle log out on click function
    //logout
    const handleLogout = () => {
      //!Delete cache content
      if(user.role === 'lecturer') {
        localStorage.removeItem("slots")
      }
      if(user.role === 'student') {
        localStorage.removeItem("subjects")
      }

      googleLogout();
      setUser(null);
      setRole(null);

      //! Delete user & role in session storage
      sessionStorage.removeItem("user");

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

  return LogOutBtn;
};
