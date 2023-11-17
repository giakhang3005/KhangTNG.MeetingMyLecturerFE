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
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

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

  let studentAndLecturer = [
    {
      label: "Lecturers",
      amount: data.totalLecturer,
      color: "#F4B678",
    },
    {
      label: "Students",
      amount: data.totalStudent,
      color: "#EC7A08",
    },
    {
      label: "Admins",
      amount: data.totalAdmin,
      color: "#ec4908",
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    // xs={} sm={} md={} xl={}
    <Row className="lecturerStatisticNumber">
      <Col xs={0} md={1}></Col>
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

      {/* Total Lecturers */}
      {/* <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<SolutionOutlined />}
            title="Total Lecturers"
            value={data.length === 0 ? "-" : data.totalLecturer}
          />
        </Card>
      </Col> */}

      {/* Total Students */}
      {/* <Col xs={12} md={5}>
        <Card className="cardStatisticNumber">
          <Statistic
            prefix={<UserOutlined />}
            title="Total Students"
            value={data.length === 0 ? "-" : data.totalStudent}
          />
        </Card>
      </Col> */}

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

      <Col xs={0} md={1}></Col>
      <Col xs={20} md={8}>
          <Doughnut
          style={Object.assign({width: '100%'}, {minWidth: '100%'}, {maxWidth: '100%'})}
            data={{
              labels: studentAndLecturer.map((user) => user.label),
              datasets: [
                {
                  label: "Total",
                  data: studentAndLecturer.map((user) => user.amount),
                  borderColor: studentAndLecturer.map((user) => user.color),
                  backgroundColor: studentAndLecturer.map((user) => user.color),
                },
              ],
            }}
            options={{}}
          />
      </Col>
      <Col xs={0} md={1}></Col>
    </Row>
  );
};
