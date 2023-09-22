import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export const LogOutBtn = () => {
  //handle log out on click function
  const handleLogout = () => {
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
