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
import { Accept, Decline, Pending } from "./RequestStatusTag";
import { updateBooking, cancelBooking } from "./RequestsFunction";
import "../../Student.css";

export function RequestsInfo(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;

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
        <Col>
          <Title level={5}>ID:</Title>
          <Title level={5}>Lecturer:</Title>
          <Title level={5}>Date:</Title>
          <Title level={5}>Start time:</Title>
          <Title level={5}>End time:</Title>
          <Title level={5}>Location:</Title>
          <Title level={5}>Subject:</Title>
          <Title level={5}>Status:</Title>
          <Title level={5}>Note:</Title>
        </Col>
        <Col xs={1}></Col>
        <Col>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.id}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.lecturer}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.date}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.startTime}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.endTime}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.location.name} (
            {isSelectedBooking.location.address})
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {isSelectedBooking.subject}
          </Title>
          <Title level={5} style={{ "font-weight": "400" }}>
            {setStatusTag(isSelectedBooking.status)}
          </Title>
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

          {/* Update note */}
          <Button
            style={{ margin: "12px 0 0 0" }}
            icon={<FormOutlined />}
            onClick={() => handleUpdateNote()}
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
              style={{ margin: "12px 0 0 8px" }}
              icon={<CloseOutlined />}
              danger
              type="primary"
            >
              Delete booking
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </>
  );
}
