import {
  Select,
  Form,
  Input,
  Button,
  Typography,
  message,
  TimePicker,
  DatePicker,
  Radio,
} from "antd";
import "../../Lecturer.css";
import dayjs from "dayjs";
import { useState } from "react";

export const CreatingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;

  const setCreatedSlotView = props.setCreatedSlotView;

  //check mode
  const [isAssignMode, setIsAssignMode] = useState(false);

  //handle cancel
  const handleCancel = () => {
    message.error("Canceled create slot");
    setCreatedSlotView("");
  };

  //handle submit update
  const handleSubmit = (data) => {
    //current date
    const now = new dayjs();
    //parse end time and start time from user input
    const startTime = data.startTime,
      endTime = data.endTime;

    if (startTime <= endTime && startTime >= now) {
      //Success
      if (!isAssignMode) {
        data = { ...data, studentname: "" };
      }

      //! Place fetching UPDATE API here

      message.success(
        `Created slot at ${data.date.$d.getDate()}/${
          data.date.$d.getMonth() + 1
        }/${
          data.date.$y
        } ${startTime.$d.getHours()}:${startTime.$d.getMinutes()} - ${endTime.$d.getHours()}:${endTime.$d.getMinutes()}`
      );
      //TODO: For Backend
      console.log(data)
      //forward to view
      setCreatedSlotView("");
    } else {
      // Error
      message.error(
        `START TIME must be EARLIER than END TIME and AFTER ${now.$d.getDate()}/${
          now.$d.getMonth() + 1
        }/${now.$y} ${now.$d.getHours()}:${now.$d.getMinutes()}`
      );
    }
  };

  //Handle Subject
  //! subject from API
  const subjects = ["SWP391", "SWT301", "SWR302"];

  //Handle location
  //! location from API
  const locations = [
    { key: "jjj", name: "FPT" },
    { key: "aaa", name: "NVH" },
  ];

  const students = [
    { key: "abc", name: "Truong Nguyen Gia Khang (K17 HCM)" },
    { key: "xyz", name: "Tran Cong Lam (K17 HCM)" },
  ];

  return (
    <>
      <Title className="sectionTitle" level={3}>
        CREATING SLOT
      </Title>
      <div className="editLocationForm">
        <Form onFinish={handleSubmit}>
          {/*  ID */}
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {/* Date */}
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          {/* Start time */}
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="hh:mm" />
          </Form.Item>

          {/* End time */}
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="hh:mm" />
          </Form.Item>

          {/* Mode */}
          {/* <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
            <Select allowClear>
              <Option key={1}>Manual approve (in requests section)</Option>
              <Option key={2}>Accept the first Booker</Option>
              <Option key={3}>Assign student</Option>
            </Select>
          </Form.Item> */}
          <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button
                value="manual"
                onClick={() => setIsAssignMode(false)}
              >
                Manual approve
              </Radio.Button>
              <Radio.Button
                value="first"
                onClick={() => setIsAssignMode(false)}
              >
                Accept the first Booker
              </Radio.Button>
              <Radio.Button
                value="assign"
                onClick={() => setIsAssignMode(true)}
              >
                Assign student
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/* Student name */}
          {isAssignMode && (
            <Form.Item
              name="studentname"
              label="Student"
              rules={[{ required: isAssignMode ? true : false }]}
            >
              <Select showSearch allowClear={true}>
                {students.map((student) => {
                  return <Option key={student.key}>{student.name}</Option>;
                })}
              </Select>
            </Form.Item>
          )}

          {/* Location */}
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Select>
              {locations.map((location) => {
                return <Option key={location.key}>{location.name}</Option>;
              })}
            </Select>
          </Form.Item>
          {/* Subject */}

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" allowClear={true}>
              {subjects.map((subject) => {
                return <Option key={subject}>{subject}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: false }]}
          >
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
};
