import { Form, Input, Button, Typography, message } from "antd";
import "../../../Lecturer.css";

export const AddingLocation = (props) => {
  const { Title } = Typography;

  //get props
  const setLocationSectionView = props.setLocationSectionView,
  finalIdOfTheList = props.finalIdOfTheList;

  //handle cancel
  const handleCancel = () => {
    message.error(`Canceled adding location`)
    setLocationSectionView('')
  };

  //handle submit
  const handleSubmit = (data) => {
    //TODO: For Backend
    const result = {...data, lecturer: null,}
    console.log(result)
    
    //! Place fetching ADD API here

    message.success(`Added location ${data.name}`)
  };

  //form values
  const formValues = {
    ["id"]: finalIdOfTheList + 1,
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        ADDING LOCATION
      </Title>
      {/* Form */}
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
