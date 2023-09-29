import { Col, Row } from "antd";
import { StudentSider } from "./Sider/StudentSider";
import { StudentContent } from "./Content/StudentContent";

export const Student = (props) => {
    return (
        <Row> 
          {/* Set default menu option */}
          {/* add to useeffect */}
          {props.menuOpt === "default" && props.setMenuOpt("studentDashboard")}
          <Col xs={24} sm={6} md={5} xl={4}>
            <StudentSider />
          </Col>
          <Col xs={24} sm={18} md={19} xl={20}>
            <StudentContent />
          </Col>
        </Row>
    )
}