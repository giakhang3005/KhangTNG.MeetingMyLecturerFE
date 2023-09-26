import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "./NavStyle.css";
const { Text, Title } = Typography;
export const Nav = () => {
  return (
    <div className="Nav">
      <Title level={5} className="logo">
        {/* Logo */}
        MEETING MY LECTURERS
        {/* Version */}
        {/* <p
          style={Object.assign(
            { padding: 0 },
            { margin: 0 },
            { "font-size": "7px" },
            { color: "grey" },
          )}
        >
          ver 1.0
        </p> */}
      </Title>

      {/* User */}
      <div className="User">
        <Text className="Name">Truong Nguyen Gia Khang (K17 HCM)</Text>
        <UserOutlined className="Icon" />
      </div>
    </div>
  );
};
