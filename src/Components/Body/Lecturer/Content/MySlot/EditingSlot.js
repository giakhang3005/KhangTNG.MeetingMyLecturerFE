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
  const dateSplit = editingSlot.date.split("/");
  const timeFormat = "HH:mm";
  const startTimeDayjs = new dayjs(editingSlot.startTime, timeFormat)
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2]);
  const endTimeDayjs = new dayjs(editingSlot.endTime, timeFormat)
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2]);

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
    const now = new dayjs();
    const mustCreateAfter = now.add(4, "hour");

    //parse end time and start time from user input
    const createDate = data.date,
      startTime = data.startTime.second(0),
      endTime = data.endTime.second(0);
    const startTimeString = `${startTime.$H}:${
      startTime.$m < 10 ? `0${startTime.$m}` : startTime.$m
    }`;
    const endTimeString = `${endTime.$H}:${
      endTime.$m < 10 ? `0${endTime.$m}` : endTime.$m
    }`;

    //remove all space in password
    // const passwordWithoutSpace = "";
    // if (data.password !== null) {
    //   passwordWithoutSpace = data.password.replace(" ", "");
    // }

    //check if start time < end time
    const checkStartEnd = () => {
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

        const result = {
          id: data.id,
          mode: data.mode,
          subject: data.subject,
          location: data.location,
          password:
            data.password === null || data.password === undefined
              ? null
              : data.password.trim() === ""
              ? null
              : data.password.trim(),
          startTime: startTimeString,
          endTime: endTimeString,
        };
        //TODO: For Backend
        console.log(result);

        //change view
        setCreatedSlotView("");
      } else {
        // Error
        message.error("START TIME must be earlier than END TIME");
      }
    };
    //check if user change start time
    if (startTime != startTimeDayjs) {
      if (startTime < mustCreateAfter) {
        message.error(
          `START TIME must be AFTER ${mustCreateAfter.$d.getDate()}/${
            mustCreateAfter.$d.getMonth() + 1
          }/${
            mustCreateAfter.$y
          } ${mustCreateAfter.$d.getHours()}:${mustCreateAfter.$d.getMinutes()}`
        );
      } else {
        checkStartEnd();
      }
    } else {
      checkStartEnd();
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
          <Form.Item name="mode" label="Mode" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio.Button value="Manual approve">Manual approve</Radio.Button>
              <Radio.Button value="Accept the first Booker">
                Accept the first Booker
              </Radio.Button>
              <Radio.Button value="Assign student" disabled>
                Assign student
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

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
