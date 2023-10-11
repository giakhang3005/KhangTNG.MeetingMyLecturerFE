import { Col, Row } from "antd";
import { AdminSider } from "./Sider/AdminSider";
import { AdminContent } from "./Content/AdminContent";
import { useEffect } from "react";

export const Admin = ({setMenuOpt}) => {
  useEffect(() => {
    setMenuOpt("adminDashboard");
  }, []);
  return (
    <Row>
      {/* Set default menu option */}
      {/* add to useeffect */}
      <Col xs={24} sm={6} md={5} xl={4}>
        <AdminSider />
      </Col>
      <Col xs={24} sm={18} md={19} xl={20}>
        <AdminContent />
      </Col>
    </Row>
  );
};
