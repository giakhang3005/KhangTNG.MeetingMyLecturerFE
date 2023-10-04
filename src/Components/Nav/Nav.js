import { UserOutlined } from "@ant-design/icons";
import { Typography, Avatar } from "antd";
import "./NavStyle.css";

const { Text, Title } = Typography;
export const Nav = (props) => {
  //user
  const user = props.user,
    setUser = props.setUser,
    isDarkMode = props.isDarkMode

  return (
    <div className="Nav">
      <div className="logo">
        {/* Logo */}
        <img
          src="../navBarLogo.png"
          style={Object.assign(
            { height: "39px" },
            { margin: "6px 0 0 0" },
            { padding: 0 }
          )}
        />
      </div>

      {/* User */}
        <div className="User">
          <Text className="Name" >{user?.name}</Text>
          {/* <UserOutlined className="Icon" /> */}
          {user !== null && (
            <Avatar src={user?.picture} icon={<UserOutlined />}></Avatar>
          )}
        </div>
    </div>
  );
};
