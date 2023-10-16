import { Form, Input, Button, Typography, message, Spin } from "antd";
import "../../../Lecturer.css";
import { useContext, useState } from "react";
import { Data } from "../../../../Body";
import axios from "axios";

export const EditingLocation = (props) => {
  const { Title } = Typography;
  const { user } = useContext(Data);

  const setLocationSectionView = props.setLocationSectionView;
  let editLocation = props.editLocation;

  //set form values
  const formValues = {
    ["id"]: editLocation.id,
    ["name"]: editLocation["name"],
    ["address"]: editLocation["address"],
  };

  //handle cancel
  const handleCancel = () => {
    message.error(`Canceled update location`);
    setLocationSectionView("");
  };

  //handle submit update
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (data) => {
    const newLocation = {
      id: editLocation.id,
      name: data.name,
      address: data.address,
      status: data.status,
      lecturerId: user.id,
    };
    //! Place fetching UPDATE API here
    if (newLocation.name.length >= 5 && newLocation.address.length >= 8) {
      setIsLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/location/update/${newLocation.id}`,
          newLocation
        )
        .then(() => {
          setIsLoading(false);
          message.success(`Updated location ${data.name}`);
          setLocationSectionView("");
        })
        .catch((err) => (console.error(err), setIsLoading(false)));
    } else {
      message.error(
        "Name must be at least 5 characters & Address must be at least 8 characters long"
      );
    }
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        EDITTING LOCATION
      </Title>
      <Spin spinning={isLoading}>
        <div className="editLocationForm">
          <Form initialValues={formValues} onFinish={handleSubmit}>
            <Form.Item name="id" label="ID" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input maxLength={30} showCount/>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input maxLength={200} showCount/>
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
