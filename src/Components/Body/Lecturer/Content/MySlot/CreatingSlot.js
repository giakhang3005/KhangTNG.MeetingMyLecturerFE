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
    const now = new dayjs(),
      nowDate = now.date(),
      nowMonth = now.month(),
      nowYear = now.year(),
      nowHour = now.hour(),
      nowMinute = now.minute();

    //parse end time and start time from user input
    const startHour = data.startTime.hour(),
      startMinute = data.startTime.minute(),
      endHour = data.endTime.hour(),
      endMinute = data.endTime.minute(),
      date = data.date.date(),
      month = data.date.month(),
      year = data.date.year();

    //Successful function
    const successfullyCreate = () => {
      message.success(
        `Updated location ${data.date} ${startHour}:${
          startMinute < 10 ? `0${startMinute}` : startMinute
        } - ${endHour}:${endMinute < 10 ? `0${endMinute}` : endMinute}`
      );
      //   setCreatedSlotView("");

      //! Place fetching UPDATE API here
    };

    //check if start time < end time
    if (startHour >= endHour) {
      message.error("START TIME must be earlier than END TIME");
      if (startMinute >= endMinute) {
      }
    } else {
      //block create slot in the past
      //date must >= today
      if (year >= nowYear && month >= nowMonth && date > nowDate) {
        successfullyCreate();
      } else {
        //if create slot for today, must from the next hour
        if (date === nowDate && startHour >= nowHour && startMinute >= nowMinute) {
          successfullyCreate();
        } else {
          message.error(`Slot must be after ${nowDate}/${nowMonth + 1}/${nowYear} ${nowHour}:${nowMinute < 10 ? '0' + nowMinute : nowMinute}`);
        }
      }
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
