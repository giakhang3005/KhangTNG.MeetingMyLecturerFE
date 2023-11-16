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
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export function RequestsInfo(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setRequestsView = props.setRequestsView,
    getData = props.getData;

  const noteRef = useRef(null);

  const { Accept, Decline, Pending } = useStudentRequests();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [inputNote, setInputNote] = useState(isSelectedBooking.note);

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

      if (updateData.note.length < 20 || updateData.note === null) {
        message.error("Note must be at least 20 characters long");
      } else {
        setLoading(true);
        axios
          .put(
            `https://meet-production-52c7.up.railway.app/api/booking/${updateData.id}`,
            updateData
          )
          .then(
            (res) => (
              message.success("Updated Successfully"),
              setLoading(false),
              getData()
            )
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
    if (isSelectedBooking.status === 1) {
      setLoading(true);
      axios
        .delete(
          `https://meet-production-52c7.up.railway.app/api/booking/${isSelectedBooking.id}`
        )
        .then(message.success("Deleted successfully"))
        .catch((err) => console.error(err))
        .finally(() => (setLoading(false), getData(), setRequestsView("view")));
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
                  {isSelectedBooking.status === 2 && (
                    <>
                      <br />
                      <i style={Object.assign({ fontSize: "13px" })}>
                        ({isSelectedBooking.contactInfo.lecturerEmail} -{" "}
                        {isSelectedBooking.contactInfo.lecturerPhone === null
                          ? "No phone number"
                          : isSelectedBooking.contactInfo.lecturerPhone}
                        )
                      </i>
                    </>
                  )}
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
                {!isSelectedBooking.slotInfo.online ? (
                  <Title
                    className="InfoText id"
                    level={5}
                    style={{ fontWeight: "400" }}
                  >
                    {isSelectedBooking.slotInfo.locationName}
                    <br />
                    <i style={Object.assign({ fontSize: "13px" })}>
                      ({isSelectedBooking.slotInfo.locationAddress}){" "}
                    </i>
                  </Title>
                ) : isSelectedBooking.status === 2 ? (
                  <a
                    href={`https://${isSelectedBooking.slotInfo.lecturerLinkMeet}`}
                    target="_blank"
                  >
                    <Tag
                      style={Object.assign(
                        { display: "flex" },
                        { alignItems: "center" },
                        { width: "106px" },
                        { justifyContent: "space-between" },
                        { margin: "12px 0 0 0" }
                      )}
                      icon={<GooglemeetLogo />}
                      color="geekblue"
                    >
                      Google Meet
                    </Tag>
                  </a>
                ) : (
                  <Tag
                    style={Object.assign(
                      { display: "flex" },
                      { alignItems: "center" },
                      { width: "106px" },
                      { justifyContent: "space-between" },
                      { margin: "12px 0 0 0" },
                      { cursor: "not-allowed" }
                    )}
                    icon={<GooglemeetLogo />}
                    color="geekblue"
                  >
                    Google Meet
                  </Tag>
                )}
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
                  <Tag color="volcano">{isSelectedBooking.subject}</Tag>
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
                      isSelectedBooking.status !== 1
                        ? "You can only edit note for pending requests"
                        : ""
                    }
                  >
                    <TextArea
                      value={inputNote}
                      onChange={onChange}
                      placeholder={
                        isSelectedBooking.status === 1
                          ? "Questions, Notes for lecturer"
                          : ""
                      }
                      disabled={isSelectedBooking.status !== 1}
                      // maxLength={250}
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
