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
    const mustCreateAfter = now.add(8, "hour");

    //parse end time and start time from user input
    const createDate = data.date,
      startTime = data.startTime
        .date(createDate.$D)
        .month(createDate.$M)
        .year(createDate.$y),
      endTime = data.endTime
        .date(createDate.$D)
        .month(createDate.$M)
        .year(createDate.$y);

    //Convert to string
    const dateString = `${createDate.$D}/${
      createDate.$M + 1 < 10 ? `0${createDate.$M + 1}` : createDate.$M + 1
    }/${createDate.$y}`;
    const startTimeString = `${startTime.$H}:${
      startTime.$m < 10 ? `0${startTime.$m}` : startTime.$m
    }`;
    const endTimeString = `${endTime.$H}:${
      endTime.$m < 10 ? `0${endTime.$m}` : endTime.$m
    }`;

    // Error
    const handleError = () => {
      message.error(
        `START TIME must be EARLIER than END TIME and AFTER ${mustCreateAfter.$d.getDate()}/${
          mustCreateAfter.$d.getMonth() + 1
        }/${
          mustCreateAfter.$y
        } ${mustCreateAfter.$d.getHours()}:${mustCreateAfter.$d.getMinutes()}`
      );
    };

    // on success
    const handleSuccess = () => {
      //Success
      if (!isAssignMode) {
        data = { ...data, studentemail: null };
      }

      //! Place fetching UPDATE API here

      message.success(
        `Created slot at ${data.date.$d.getDate()}/${
          data.date.$d.getMonth() + 1
        }/${
          data.date.$y
        } ${startTime.$d.getHours()}:${startTime.$d.getMinutes()} - ${endTime.$d.getHours()}:${endTime.$d.getMinutes()}`
      );
      //forward to view
      setCreatedSlotView("");
      //TODO: For Backend

      const result = {
        ...data,
        password: data.password.trim() === "" ? null : data.password.trim(),
        startTime: startTimeString,
        endTime: endTimeString,
        date: dateString,
      };
      console.log(result);
    };

    //Check condition
    if (startTime < mustCreateAfter) {
      handleError();
    } else {
      if (startTime < endTime) {
        handleSuccess();
      } else {
        handleError();
      }
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

  const allStudentsEmail = [
    "khangtngse171927@fpt.edu.vn",
    "lamtcse173603@fpt.edu.vn",
    "thanhvtse173589@fpt.edu.vn",
    "minhmndse173605@fpt.edu.vn",
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
            <TimePicker format="HH:mm" />
          </Form.Item>

          {/* End time */}
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" />
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
                value="Manual approve"
                onClick={() => setIsAssignMode(false)}
              >
                Manual approve
              </Radio.Button>
              <Radio.Button
                value="Accept the first Booker"
                onClick={() => setIsAssignMode(false)}
              >
                Accept the first Booker
              </Radio.Button>
              <Radio.Button
                value="Assign student"
                onClick={() => setIsAssignMode(true)}
              >
                Assign student
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/* Student email */}
          {isAssignMode && (
            <Form.Item
              name="studentemail"
              label="Student Email"
              rules={[{ required: isAssignMode ? true : false }]}
            >
              <Select showSearch allowClear={true}>
                {allStudentsEmail.map((student) => {
                  return <Option value={student}>{student}</Option>;
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
