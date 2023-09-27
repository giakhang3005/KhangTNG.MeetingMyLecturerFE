import { Select, Form, Input, Button, Typography, message } from "antd";
import "../../Lecturer.css";

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
    //parse end time and start time
    const startTime = data.startTime.split(":"),
      endTime = data.endTime.split(":");

    //check if start time < end time
    let errMsg = "";
    if (startTime[0] >= endTime[0]) {
      message.error("START TIME must be earlier than END TIME");
      if (startTime[1] >= endTime[1]) {
      }
    } else {
      //Successful
      message.success(
        `Updated location ${data.date} ${data.startTime} - ${data.endTime}`
      );
      setCreatedSlotView("");

      //! Place fetching UPDATE API here
    }
    console.log(data.subject);
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
            <Input disabled />
          </Form.Item>
          {/* Date */}
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* Start time */}
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
          {/* End time */}
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
            <Select
              mode="multiple"
              allowClear={true}
            >
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
