import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "./NavStyle.css";
const { Text, Title } = Typography;
export const Nav = () => {
  return (
    <div className="Nav">
      <Title level={5} className="logo">MEETING MY LECTURERS</Title>
      <div className="User">
        <Text className="Name">Truong Nguyen Gia Khang (K17 HCM)</Text>
        <UserOutlined className="Icon" />
      </div>
    </div>
  );
};
