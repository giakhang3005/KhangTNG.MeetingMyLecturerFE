import { React, useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Input, message, Spin } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function AddLocations({ setMenuOpt }) {
  const { Title } = Typography;

  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = () => {
    const userInput = document.querySelectorAll(".ant-input");
    const newLocation = {
      name: userInput[0].value,
      address: userInput[1].value,
      status: true,
      lecturerId: null,
    };

    if (newLocation.name.length >= 5 && newLocation.address.length >= 8) {
      setIsLoading(true);
      axios
        .post(
          "https://meet-production-52c7.up.railway.app/api/location/new-location",
          newLocation
        )
        .then(() => {
          message.success("Created new location");
          setIsLoading(false);
          setMenuOpt('publicLocationsManage')
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
        ADD PUBLIC LOCATIONS
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

      <Spin spinning={false}>
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
                  <Input className="editInput" maxLength={30} showCount></Input>
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
                  <Input className="editInput" maxLength={200} showCount></Input>
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
                  <Input disabled className="editInput" value="PUBLIC"></Input>
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
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
