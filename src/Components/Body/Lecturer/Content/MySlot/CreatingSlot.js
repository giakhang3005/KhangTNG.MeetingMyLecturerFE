import {
  Select,
  Form,
  Input,
  Button,
  Typography,
  message,
  TimePicker,
  DatePicker,
} from "antd";
import "../../Lecturer.css";
import dayjs from "dayjs";

export const CreatingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;

  const setCreatedSlotView = props.setCreatedSlotView;

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
  const locations = ["FPT", "NVH"];

  return (
    <>
      <Title className="sectionTitle" level={3}>
        CREATING SLOT
      </Title>
      <div className="editLocationForm">
        <Form onFinish={handleSubmit}>
          {/* ID */}
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
            <TimePicker />
          </Form.Item>
          {/* End time */}
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            <TimePicker />
          </Form.Item>
          {/* Location */}
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Select>
              {locations.map((location) => {
                return <Option key={location}>{location}</Option>;
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
