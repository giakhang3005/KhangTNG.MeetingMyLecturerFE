import { Form, Input, Button, Typography, message, Spin } from "antd";
import "../../../Lecturer.css";
import { Data } from "../../../../Body";
import { useContext, useState } from "react";
import axios from "axios";

export const AddingLocation = (props) => {
  const { Title } = Typography;
  const { user } = useContext(Data);

  //get props
  const setLocationSectionView = props.setLocationSectionView;

  //handle cancel
  const handleCancel = () => {
    message.error(`Canceled adding location`);
    setLocationSectionView("");
  };

  //handle submit
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (data) => {
    //TODO: For Backend
    const newLocation = {
      name: data.name,
      address: data.address,
      status: false,
      lecturerId: user.id,
    };
    if (newLocation.address.length >= 5 && newLocation.address.length >= 3) {
      setIsLoading(true);
      axios
        .post(
          "https://meet-production-52c7.up.railway.app/api/location/new-location",
          newLocation
        )
        .then(() => {
          message.success("Created new location");
          setIsLoading(false);
          setLocationSectionView("");
        })
        .catch((err) => console.error(err));
    } else {
      message.error(
        "Name must be at least 3 characters & Address must be at least 5 characters long"
      );
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        ADDING LOCATION
      </Title>

      {/* Form */}
      <Spin spinning={isLoading}>
        <div className="editLocationForm">
          <Form onFinish={handleSubmit}>
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
      </Spin>
    </>
  );
};
