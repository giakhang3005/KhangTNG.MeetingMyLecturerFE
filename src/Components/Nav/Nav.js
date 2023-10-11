import { UserOutlined } from "@ant-design/icons";
import { Typography, Avatar } from "antd";
import "./NavStyle.css";

const { Text } = Typography;
export const Nav = (props) => {
  //user
  const user = props.user;

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
          alt="Meeting my Lecturers"
        />
      </div>

      {/* User */}
        <div className="User">
          <Text className="Name" >{user?.name}</Text>
          {/* <UserOutlined className="Icon" /> */}
          {user !== null && (
            <Avatar src={user?.picture} icon={<UserOutlined />} alt="your avatar"></Avatar>
          )}
        </div>
    </div>
  );
};
