import { Col, Row } from "antd";
import { LecturerSider } from "./Sider/LecturerSider";
import { LecturerContent } from "./Content/LecturerContent";

export const Lecturer = (props) => {
    return (
        <Row> 
          {/* Set default menu option */}
          {/* add to useeffect */}
          {props.menuOpt === "default" && props.setMenuOpt("lecturerDashboard")}
          <Col xs={24} sm={6} md={5} xl={4}>
            <LecturerSider />
          </Col>
          <Col xs={24} sm={18} md={19} xl={20}>
            <LecturerContent />
          </Col>
        </Row>
    )
}