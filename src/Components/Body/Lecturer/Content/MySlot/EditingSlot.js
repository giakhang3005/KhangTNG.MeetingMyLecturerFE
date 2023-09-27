import {
  Select,
  Form,
  Input,
  Button,
  Typography,
  message,
  TimePicker,
} from "antd";
import "../../Lecturer.css";
import { parseDate } from "../../../../../ExtendedFunction/Date.js";
import dayjs from "dayjs";

export const EditingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;

  const editingSlot = props.editingSlot,
    setCreatedSlotView = props.setCreatedSlotView;

  //Time format
  const timeFormat = "HH:mm";
  const startTimeDayjs = new dayjs(editingSlot.startTime, timeFormat);
  const endTimeDayjs = new dayjs(editingSlot.endTime, timeFormat);

  //set form values
  const formValues = {
    ["id"]: editingSlot.id,
    ["date"]: editingSlot.date,
    ["startTime"]: startTimeDayjs,
    ["endTime"]: endTimeDayjs,
    ["location"]: editingSlot.location, //Show many options
    ["subject"]: editingSlot.subject, //can select many options
    ["password"]: editingSlot.password,
  };

  //handle cancel
  const handleCancel = () => {
    message.error("Canceled update slot");
    setCreatedSlotView("");
  };

  //handle submit update
  const handleSubmit = (data) => {
    //current date
    const now = new dayjs(),
      nowDate = now.date(),
      nowMonth = now.month(),
      nowYear = now.year(),
      nowHour = now.hour(),
      nowMinute = now.minute();

    //parse end time and start time
    const startHour = data.startTime.hour(),
      startMinute = data.startTime.minute(),
      endHour = data.endTime.hour(),
      endMinute = data.endTime.minute();

    //check if start time < end time
    if (startHour >= endHour) {
      message.error("START TIME must be earlier than END TIME");
      if (startMinute >= endMinute) {
      }
    } else {
      //Successful
      message.success(
        `Updated location ${data.date} ${startHour}:${
          startMinute < 10 ? `0${startMinute}` : startMinute
        } - ${endHour}:${endMinute < 10 ? `0${endMinute}` : endMinute}`
      );
      setCreatedSlotView("");

      //   //! Place fetching UPDATE API here
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
        EDITTING SLOT
      </Title>
      <div className="editLocationForm">
        <Form initialValues={formValues} onFinish={handleSubmit}>
          {/* ID */}
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          {/* Date */}
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          {/* Start time */}
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <TimePicker defaultValue={startTimeDayjs} />
          </Form.Item>
          {/* End time */}
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            {/* <Input /> */}
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
            <Select mode="multiple" allowClear>
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
