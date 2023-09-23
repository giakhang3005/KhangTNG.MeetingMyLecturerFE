import { Col, Row } from "antd";
import { LecturerSider } from "./Sider/LecturerSider";
import { LecturerContent } from "./Content/LecturerContent";

export const Lecturer = () => {
    return (
        <Row> 
          <Col xs={24} sm={10} md={7} xl={5}>
            <LecturerSider />
          </Col>
          <Col xs={24} sm={14} md={17} xl={19}>
            <LecturerContent />
          </Col>
        </Row>
    )
}