import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {MessageOutlined, HourglassOutlined, NotificationOutlined, GlobalOutlined} from '@ant-design/icons'
import "../../Lecturer.css";

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
          <Statistic prefix={<HourglassOutlined />} title="Total Hours" value={20.5} />
        </Card>
      </Col>

      {/* Total Locations */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic prefix={<GlobalOutlined />} title="Total Locations" value={3} />
        </Card>
      </Col>

      {/* Most meeting subject */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic prefix={<MessageOutlined />} title="Most Discuss" value={"SWP391"} />
        </Card>
      </Col>
    </Row>
  );
};
