import { React, useState } from "react";
import {
  Typography,
  Input,
  message,
  Button,
  Row,
  Col,
  Popover,
  Popconfirm,
} from "antd";
import { LeftOutlined, FormOutlined, CloseOutlined } from "@ant-design/icons";
import "../../Student.css";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsInfo(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;

  const { updateBooking, cancelBooking, Accept, Decline, Pending } =
    useStudentRequests();

  const { Title, Text } = Typography;
  const { TextArea } = Input;
  const ArrayToString = useArray();

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

  const handleUpdateNote = () => {
    if (isSelectedBooking.status === "pending") {
      const updateData = {
        id: isSelectedBooking.id,
        note: inputNote,
      };
      updateBooking(updateData, setRequestsView);
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
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setRequestsView("view")}
      >
        Back
      </Button>

      <Row>
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
                style={{ "font-weight": "400" }}
              >
                {isSelectedBooking.lecturer}
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
                style={{ "font-weight": "400" }}
              >
                {isSelectedBooking.date}
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
                style={{ "font-weight": "400" }}
              >
                {isSelectedBooking.startTime}
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
                style={{ "font-weight": "400" }}
              >
                {isSelectedBooking.endTime}
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
                style={{ "font-weight": "400" }}
              >
                {isSelectedBooking.location.name} (
                {isSelectedBooking.location.address})
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
                style={{ "font-weight": "400" }}
              >
                {ArrayToString(isSelectedBooking.subject)}
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
                style={{ "font-weight": "400" }}
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
                style={{ "font-weight": "400" }}
              >
                <Popover
                  content={
                    isSelectedBooking.status !== "pending" &&
                    "You can only edit note for pending requests"
                  }
                >
                  <TextArea
                    value={inputNote}
                    onChange={onChange}
                    placeholder={
                      isSelectedBooking.status === "pending" &&
                      "Questions, Notes for lecturer"
                    }
                    disabled={isSelectedBooking.status !== "pending"}
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
                style={{ margin: "12px 8px 0 0" }}
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
                  style={{ margin: "12px 0 0 0" }}
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
    </>
  );
}
