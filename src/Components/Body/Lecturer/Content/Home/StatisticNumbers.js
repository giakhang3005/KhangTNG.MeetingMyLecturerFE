import { React, useEffect, useState, useContext } from "react";
import { Card, Col, Row, Statistic, Tabs } from "antd";
import {
  MessageOutlined,
  HourglassOutlined,
  NotificationOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "../../Lecturer.css";
import { Data } from "../../../Body";
import axios from "axios";

export const StatisticNumber = () => {
  const { user } = useContext(Data);
  const [data, setData] = useState({});
  const getData = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/indicator/${user.id}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    // xs={} sm={} md={} xl={}
    <>
      <Tabs
        style={Object.assign({ margin: "0 3.4% 0 3.4%" })}
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "All time",
            children: (
              <Row className="lecturerStatisticNumber">
                {/* Total Slot */}
                <Col xs={1}></Col>
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<NotificationOutlined />}
                      title="Total Slots"
                      value={
                        JSON.stringify(data) === "{}" ? "-" : data.totalSlot
                      }
                    />
                  </Card>
                </Col>

                {/* Total Hours */}
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<HourglassOutlined />}
                      title="Total Time"
                      value={
                        JSON.stringify(data) === "{}"
                          ? "-"
                          : data.totalHours === null
                          ? "0"
                          : data.totalHours
                      }
                    />
                  </Card>
                </Col>

                {/* Total Locations */}
                {/* <Col xs={12} md={5}>
          <Card className="cardStatisticNumber">
            <Statistic prefix={<GlobalOutlined />} title="Total Locations" value={JSON.stringify(data) === "{}" ? "-" : data.totalLocation} />
          </Card>
        </Col> */}

                {/* Most meeting subject */}
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<MessageOutlined />}
                      title="Most Discuss"
                      value={
                        JSON.stringify(data) === "{}"
                          ? "-"
                          : data.mostDiscussSubject === null
                          ? "-"
                          : data.mostDiscussSubject
                      }
                    />
                  </Card>
                </Col>
                <Col xs={1}></Col>
              </Row>
            ),
          },
          {
            key: "2",
            label: "This month",
            children: (
              <Row className="lecturerStatisticNumber">
                {/* Total Slot */}
                <Col xs={1}></Col>
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<NotificationOutlined />}
                      title="Total Slots"
                      value={
                        JSON.stringify(data) === "{}" ? "-" : data.totalSlot
                      }
                    />
                  </Card>
                </Col>

                {/* Total Hours */}
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<HourglassOutlined />}
                      title="Total Time"
                      value={
                        JSON.stringify(data) === "{}"
                          ? "-"
                          : data.totalHours === null
                          ? "0"
                          : data.totalHours
                      }
                    />
                  </Card>
                </Col>

                {/* Most meeting subject */}
                <Col xs={12} md={5}>
                  <Card className="cardStatisticNumber">
                    <Statistic
                      prefix={<MessageOutlined />}
                      title="Most Discuss"
                      value={
                        JSON.stringify(data) === "{}"
                          ? "-"
                          : data.mostDiscussSubject === null
                          ? "-"
                          : data.mostDiscussSubject
                      }
                    />
                  </Card>
                </Col>
                <Col xs={1}></Col>
              </Row>
            ),
          },
        ]}
      />

    </>
  );
};
