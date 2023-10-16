import { React, useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Input, message, Spin } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function EditLocations({ setMenuOpt, locationEdit }) {
  const { Title } = Typography;

  const [isLoading, setIsLoading] = useState(false);
  const [lecturerName, setLecturerName] = useState("");
  useEffect(() => {
    locationEdit.lecturerId !== null &&
      axios
        .get(
          `https://meet-production-52c7.up.railway.app/api/v1/account/get/${locationEdit.lecturerId}`
        )
        .then((response) => setLecturerName(response.data.data.name))
        .then(setIsLoading(false))
        .catch((err) => (console.error(err), setIsLoading(false)));
  }, []);

  const handleSubmit = () => {
    const userInput = document.querySelectorAll(".ant-input");

    const newLocation = {
      id: locationEdit.id,
      name: userInput[0].value,
      address: userInput[1].value,
      status: locationEdit.status,
      lecturerId: locationEdit.lecturerId,
    };
    if (newLocation.name.length >= 5 && newLocation.address.length >= 8) {
      setIsLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/location/update/${newLocation.id}`,
          newLocation
        )
        .then(() => {
          message.success("Updated location");
          setIsLoading(false);
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
        EDIT LOCATIONS
      </Title>

      {/* Back button */}
      <Button
        disabled={isLoading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("publicLocationsManage")}
      >
        Back
      </Button>

      <Spin spinning={isLoading}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* NAME */}
            <Row>
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
                  <Input
                    maxLength={30}
                    showCount
                    className="editInput"
                    defaultValue={locationEdit.name}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* ADDRESS */}
            <Row>
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
                  <Input
                    maxLength={200}
                    showCount
                    className="editInput"
                    defaultValue={locationEdit.address}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Mode */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Mode:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input
                    disabled
                    className="editInput"
                    value={locationEdit.status ? "PUBLIC" : "PERSONAL"}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* lecturer */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Lecturer:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input
                    disabled
                    className="editInput"
                    value={lecturerName}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Buttons */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}></Title>
              </Col>
              <Col xs={15} md={10}>
                {/* Update note */}
                <Button
                  loading={isLoading}
                  type="primary"
                  style={{ margin: "12px 8px 0 0" }}
                  icon={<FormOutlined />}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
