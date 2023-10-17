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
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";
import axios from "axios";

export function RequestsInfo(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setRequestsView = props.setRequestsView;

  const noteRef = useRef(null);

  const { cancelBooking, Accept, Decline, Pending } = useStudentRequests();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [inputNote, setInputNote] = useState(isSelectedBooking.note);

  //check for status & return tag
  const setStatusTag = (status) => {
    switch (status) {
      case "accept":
        return <Accept />;
      case "decline":
        return <Decline />;
      default:
        return <Pending />;
    }
  };

  //On note change
  const onChange = (e) => {
    setInputNote(e.target.value);
  };

  const [loading, setLoading] = useState(false);
  const handleUpdateNote = () => {
    if (isSelectedBooking.status === 1) {
      const updateData = {
        id: isSelectedBooking.id,
        note: inputNote?.trim(),
      };

      if (updateData.note.length <= 0 || updateData.note === null) {
        message.error("Note can not be empty");
      } else {
        setLoading(true);
        axios
          .put(
            `https://meet-production-52c7.up.railway.app/api/booking/${updateData.id}`,
            updateData
          )
          .then((res) =>
            message.success("Updated Successfully", setLoading(false))
          )
          .catch((err) => (console.log(err), setLoading(false)));
      }
    } else {
      message.error("You can only update notes for pending booking requests");
    }
  };

  //count click
  const [clickUpdate, setClickUpdate] = useState(0);

  //cooldown 3s if user click over 2 times
  setTimeout(() => {
    clickUpdate > 0 && setClickUpdate(clickUpdate - 1);
  }, 3000);
  //checker
  const updateAntiSpam = () => {
    clickUpdate === 2 && message.error("Please try again after 3 seconds");
    clickUpdate < 3 && setClickUpdate(clickUpdate + 1);
    if (clickUpdate < 2) {
      handleUpdateNote();
    }
  };

  const handleDeleteBooking = () => {
    if (isSelectedBooking.status === "pending") {
      cancelBooking(isSelectedBooking.id, setRequestsView);
    } else {
      message.error("You can only delete pending booking requests");
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS INFO
      </Title>

      {/* Back button */}
      <Button
        disabled={loading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setRequestsView("view")}
      >
        Back
      </Button>

      <Spin spinning={loading}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* ID */}
            <Row>
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
            </Row>

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
                  {isSelectedBooking.slotInfo.locationName}{" "}
                  <i style={{ fontSize: "14px" }}>
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
                      <Tag color="orange" key={i}>
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
                  <Popover
                    content={
                      isSelectedBooking.status !== 1 &&
                      "You can only edit note for pending requests"
                    }
                  >
                    <TextArea
                      value={inputNote}
                      onChange={onChange}
                      placeholder={
                        isSelectedBooking.status === 1 &&
                        "Questions, Notes for lecturer"
                      }
                      disabled={isSelectedBooking.status !== 1}
                      maxLength={250}
                      showCount
                    />
                  </Popover>
                </Title>
              </Col>
            </Row>

            {/* Buttons */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}></Title>
              </Col>
              <Col xs={15} md={10}>
                {/* Update note */}
                <Button
                  style={{ margin: "7px 8px 0 0" }}
                  icon={<FormOutlined />}
                  onClick={updateAntiSpam}
                >
                  Update note
                </Button>

                {/* Delete */}
                <Popconfirm
                  title="Delete booking confirm"
                  description={`Are you sure to delete this booking request?`}
                  okText="Delete"
                  icon={<CloseOutlined style={{ color: "red" }} />}
                  onConfirm={handleDeleteBooking}
                >
                  <Button
                    style={{ margin: "7px 0 0 0" }}
                    icon={<CloseOutlined />}
                    danger
                    type="primary"
                  >
                    Delete booking
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
