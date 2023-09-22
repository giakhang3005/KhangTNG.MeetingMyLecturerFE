import "./Lecturer.css";
import { LecturerMenu } from "./LecturerMenu";
import { Calendar, theme, ConfigProvider } from "antd";

export const LecturerSider = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="Sider">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          <LecturerMenu />
    </div>
  );
};
