import { UserOutlined } from "@ant-design/icons";
import { Typography, Avatar, Alert } from "antd";
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
      <Alert closable type="error" message={<ul>
        <li>Student khi book chọn 1 môn</li>
        <li>Khi book student phải fill note ngắn (giới thiệu,...), note dài để ghi câu hỏi</li>
        <li>Làm blacklist & report</li>
      </ul>} />

      {/* User */}
      {user !== null && (
        <div className="User">
          <Text className="Name">{user?.name}</Text>
          {/* <UserOutlined className="Icon" /> */}

          <Avatar
            src={user?.picture}
            icon={<UserOutlined />}
            alt="your avatar"
          ></Avatar>
        </div>
      )}
    </div>
  );
};
