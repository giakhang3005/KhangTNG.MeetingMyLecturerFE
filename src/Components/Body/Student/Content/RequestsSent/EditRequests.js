import React from "react";
import { Form, Typography, Input, Button, message } from "antd";

export function EditRequests(props) {
  const isSelectedBooking = props.isSelectedBooking,
    setIsSelectedBooking = props.setIsSelectedBooking;
  const { Title } = Typography;

  //set form values
  const formValues = {
    ["id"]: isSelectedBooking.id,
    ["subject"]: isSelectedBooking.subject,
    ["lecturer"]: isSelectedBooking.lecturer,
    ["date"]: isSelectedBooking.date,
    ["startTime"]: isSelectedBooking.startTime,
    ["endTime"]: isSelectedBooking.endTime,
    ["note"]: isSelectedBooking.note,
  };

  const handleCancel = () => {
    setIsSelectedBooking([]);
  };
  const handleSubmit = (data) => {
    const result = {
      ...data,
      note: data.note === "" ? null : data.note,
      //! get Booker then send to backend
      booker: null,
    };


    message.success("Updated booking")
    setIsSelectedBooking([]);
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUEST EDITING
      </Title>
      <div className="editLocationForm">
        <Form initialValues={formValues} onFinish={handleSubmit}>
          {/* ID */}
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          {/* Subject */}
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          {/* Lecturer */}
          <Form.Item
            name="lecturer"
            label="Lecturer"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          {/* Date */}
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input disabled />

            {/* Start Time */}
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          {/* End Time */}
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          {/* Note */}
          <Form.Item name="note" label="Note" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          {/* Cancel */}
          <Form.Item>
            <Button
              onClick={handleCancel}
              style={{ margin: "0 8px 0 0" }}
              type="default"
              danger
            >
              Cancel
            </Button>
            {/* Save */}
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
