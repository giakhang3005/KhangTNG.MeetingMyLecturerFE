import { Form, Input, Button, Typography, message } from "antd";
import "../../../Lecturer.css";

export const EditingLocation = (props) => {
  const { Title } = Typography;

  const setLocationSectionView = props.setLocationSectionView;
  let editLocation = props.editLocation;

  //set form values
  const formValues = {
    ["id"]: editLocation.id,
    ["name"]: editLocation["Location name"],
    ["address"]: editLocation["Location address"],
  };

  //handle cancel
  const handleCancel = () => {
    message.error(`Canceled update location`)
    setLocationSectionView('')
  };

  //handle submit update
  const handleSubmit = (data) => {
    message.success(`Updated location ${data.name}`)
    
    //! Place fetching UPDATE API here

    setLocationSectionView('')
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        EDITTING LOCATION
      </Title>
      <div className="editLocationForm">
        <Form initialValues={formValues} onFinish={handleSubmit}>
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancel} style={{ margin: "0 8px 0 0" }} type="default" danger>
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
