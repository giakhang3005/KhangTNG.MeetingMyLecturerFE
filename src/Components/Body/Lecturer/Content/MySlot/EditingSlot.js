import { Select, Form, Input, Button, Typography, message } from "antd";
import "../../Lecturer.css";

export const EditingSlot = (props) => {
  const { Option } = Select;
  const { Title } = Typography;

  const editingSlot = props.editingSlot,
    setCreatedSlotView = props.setCreatedSlotView;

  //set form values
  const formValues = {
    ["id"]: editingSlot.id,
    ["date"]: editingSlot.date,
    ["startTime"]: editingSlot.startTime,
    ["endTime"]: editingSlot.endTime,
    ["location"]: editingSlot.location, //Show many options
    ["subject"]: editingSlot.subject, //can select many options
    ["password"]: editingSlot.password,
  };

  //test location field
  const locations = ["FPT", "NVH"];

  //handle cancel
  const handleCancel = () => {
    message.error(`Canceled update slot`);
    setCreatedSlotView("");
  };

  //handle submit update
  const handleSubmit = (data) => {
    //parse end time and start time
    const startTime = data.startTime.split(":"),
      endTime = data.endTime.split(":");

    //check if start time < end time
    if (startTime[1] >= endTime[1]) {
      if (startTime[0] >= endTime[0]) {
        message.error(`START TIME must be earlier than END TIME`);
      }
    } else {
      message.success(
        `Updated location ${data.date} ${data.startTime} - ${data.endTime}`
      );
      setCreatedSlotView("");

      //! Place fetching UPDATE API here
    }
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        EDITTING SLOT
      </Title>
      <div className="editLocationForm">
        <Form initialValues={formValues} onFinish={handleSubmit}>
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[
              { required: true },
              { max: 5, message: "Time must be format XX:XX" },
              { min: 5, message: "Time must be format XX:XX" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[
              { required: true },
              { max: 5, message: "Time must be format XX:XX" },
              { min: 5, message: "Time must be format XX:XX" },
            ]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleCancel}
              style={{ margin: "0 8px 0 0" }}
              type="default"
              danger
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
