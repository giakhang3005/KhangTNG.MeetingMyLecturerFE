import { React, useState, useRef } from "react";
import {
  Typography,
  Input,
  message,
  Button,
  Row,
  Col,
  Popover,
  Popconfirm,
  Tag,
  Spin,
} from "antd";
import { LeftOutlined, FormOutlined, CloseOutlined } from "@ant-design/icons";
import "../../Student.css";
import axios from "axios";

export function RequestsInfo(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setRequestsView = props.setRequestsView,
    getData = props.getData;


  const { Accept, Decline, Pending } = useStudentRequests();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  //check for status & return tag
  const setStatusTag = (status) => {
    switch (status) {
      case 2:
        return <Accept />;
      case 0:
        return <Decline />;
      default:
        return <Pending />;
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS INFO
      </Title>

      {/* Back button */}
      <Button
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setRequestsView("view")}
      >
        Back
      </Button>

      <Row className="requestsInfo">
        <Col xs={1}></Col>
        <Col xs={23}>
          {/* ID */}
          {/* <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  ID:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  {isSelectedBooking.id}
                </Title>
              </Col>
            </Row> */}

          {/* Lecturer */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Lecturer:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.slotInfo.lecturerName}
              </Title>
            </Col>
          </Row>

          {/* Date */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Date:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.slotInfo.meetingDate}
              </Title>
            </Col>
          </Row>

          {/* Start Time */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Start Time:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.slotInfo.startTime}
              </Title>
            </Col>
          </Row>

          {/* End Time */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                End Time:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.slotInfo.endTime}
              </Title>
            </Col>
          </Row>

          {/* Location */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Location:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.slotInfo.locationName} <br />
                <i style={{ fontSize: "13px" }}>
                  ({isSelectedBooking.slotInfo.locationAddress})
                </i>
              </Title>
            </Col>
          </Row>

          {/* Subject */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Subject:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {isSelectedBooking.subjectSlot.map((subject, i) => {
                  return (
                    <Tag color="volcano" key={i}>
                      {subject.subjectCode}
                    </Tag>
                  );
                })}
              </Title>
            </Col>
          </Row>

          {/* Status */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Status:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                {setStatusTag(isSelectedBooking.status)}
              </Title>
            </Col>
          </Row>

          {/* Note */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Note:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={Object.assign(
                  { fontWeight: "400" },
                  { padding: "0 0 7px 0" }
                )}
              >
                <TextArea value={isSelectedBooking.note} disabled showCount />
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
