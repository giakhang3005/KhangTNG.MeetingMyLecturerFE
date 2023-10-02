import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {TeamOutlined, SnippetsOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'

export const StatisticNumber = () => {
  return (
    // xs={} sm={} md={} xl={}
    <Row className="lecturerStatisticNumber">
      {/* Total Slot */}
      <Col xs={12} md={5} >
        <Card className="cardStatisticNumber">
          <Statistic prefix={<NotificationOutlined />} title="Total Slots" value={23} />
        </Card>
      </Col>

      {/* Total Hours */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic prefix={<SnippetsOutlined />} title="Total Bookings" value={20} />
        </Card>
      </Col>

      {/* Total Locations */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic prefix={<UserOutlined />} title="Total Users" value={3} />
        </Card>
      </Col>

      {/* Most meeting subject */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic prefix={<TeamOutlined />} title="Total Meetings" value={100} />
        </Card>
      </Col>
    </Row>
  );
};
