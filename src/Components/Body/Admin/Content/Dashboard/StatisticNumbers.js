import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  TeamOutlined,
  SolutionOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";

export const StatisticNumber = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(
        "https://meet-production-52c7.up.railway.app/api/dashboard/admin/indicator"
      )
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    // xs={} sm={} md={} xl={}
    <Row className="lecturerStatisticNumber">
      {/* Total Slot */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<NotificationOutlined />}
            title="Total Slots"
            value={data.length === 0 ? "-" : data.createdSlot}
          />
        </Card>
      </Col>

      {/* Total Hours */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<SolutionOutlined />}
            title="Total Lecturers"
            value={data.length === 0 ? "-" : data.totalLecturer}
          />
        </Card>
      </Col>

      {/* Total Locations */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<UserOutlined />}
            title="Total Students"
            value={data.length === 0 ? "-" : data.totalStudent}
          />
        </Card>
      </Col>

      {/* Most meeting subject */}
      <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<TeamOutlined />}
            title="Total Meetings"
            value={data.length === 0 ? "-" : data.totalMeeting}
          />
        </Card>
      </Col>
    </Row>
  );
};
