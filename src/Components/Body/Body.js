import { Layout, ConfigProvider, Col, Row } from "antd";
import { LecturerSider } from "./Lecturer/LecturerSider";
import { LecturerContent } from "./Lecturer/LecturerContent";

export const Body = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#F15A25",

          // Alias Token
          colorBgContainer: "#fffff",
        },
      }}
    >
      <Row>
        <Col xs={24} sm={10} md={7} xl={5}>
          <LecturerSider />
        </Col>
        <Col xs={24} sm={14} md={17} xl={19}>
          <LecturerContent />
        </Col>
      </Row>
    </ConfigProvider>
  );
};
