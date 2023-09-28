import {
  Select,
  Form,
  Input,
  Button,
  Typography,
  message,
  TimePicker,
  Radio,
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
    ["mode"]: editingSlot.mode,
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
    //parse end time and start time
    const startTime = data.startTime,
      endTime = data.endTime;
    //remove all space in password
    // const passwordWithoutSpace = "";
    // if (data.password !== null) {
    //   passwordWithoutSpace = data.password.replace(" ", "");
    // }

    //check if start time < end time
    if (endTime > startTime) {
      //Successful
      //! Place fetching UPDATE API here

      message.success(
        `Updated slot ${data.date} ${startTime.$d.getHours()}:${
          startTime.$d.getMinutes() < 10
            ? "0" + startTime.$d.getMinutes()
            : startTime.$d.getMinutes()
        } - ${endTime.$d.getHours()}:${
          endTime.$d.getMinutes() < 10
            ? "0" + endTime.$d.getMinutes()
            : endTime.$d.getMinutes()
        }`
      );
      //TODO: For Backend
      console.log(data)

      //change view
      setCreatedSlotView("");
    } else {
      // Error
      message.error("START TIME must be earlier than END TIME");
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
          <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button
                value="Manual approve"
              >
                Manual approve
              </Radio.Button>
              <Radio.Button
                value="Accept the first Booker"
              >
                Accept the first Booker
              </Radio.Button>
              <Radio.Button
                value="Assign student"
                disabled
              >
                Assign student
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          {/* Location */}
          {console.log('Input locations')}
          {console.log(locations)}
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
          {console.log('Input subjects')}
          {console.log(subjects)}
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
