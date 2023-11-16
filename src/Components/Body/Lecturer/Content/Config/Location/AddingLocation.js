import { Input, Button, Typography, message, Spin, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "../../../Lecturer.css";
import { Data } from "../../../../Body";
import { useContext, useState } from "react";
import axios from "axios";

export const AddingLocation = (props) => {
  const { Title } = Typography;
  const { user } = useContext(Data);

  //get props
  const setLocationSectionView = props.setLocationSectionView,
    getLocations = props.getLocations;

  //handle submit
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const handleSubmit = () => {
    const newLocation = {
      name: name,
      address: address,
      status: false,
      lecturerId: user.id,
    };
    if (newLocation.name.length >= 5 && newLocation.address.length >= 8) {
      setIsLoading(true);
      axios
        .post(
          "https://meet-production-52c7.up.railway.app/api/location/new-location",
          newLocation
        )
        .then((res) => {
          // console.log(res);
          message.success("Created new location");
          setIsLoading(false);
          getLocations();
          setLocationSectionView("");
        })
        .catch((err) => console.error(err));
    } else {
      message.error(
        "Name must be at least 5 characters & Address must be at least 8 characters long"
      );
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        ADDING LOCATION
      </Title>
      <Button
        disabled={isLoading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setLocationSectionView("")}
      >
        Back
      </Button>
      {/* Form */}
      <Spin spinning={isLoading}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>

          <Col xs={23}>
            {/* Name */}
            <Row className="animateBox">
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Name:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input value={name} maxLength={30} showCount onChange={(e) => setName(e.target.value)} />
                </Title>
              </Col>
            </Row>

            {/* Address */}
            <Row className="animateBox">
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Address:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input value={address} maxLength={200} showCount onChange={(e) => setAddress(e.target.value)} />
                </Title>
              </Col>
            </Row>

            {/* Save */}
            <Row className="animateBox">
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}></Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Button type="primary" onClick={handleSubmit}>
                    Save
                  </Button>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
