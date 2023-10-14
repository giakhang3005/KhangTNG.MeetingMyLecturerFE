import { React, useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Input, message, Spin } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function AddLocations({setMenuOpt}) {
  const { Title } = Typography;

  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = () => {
    setIsLoading(true);
    const userInput = document.querySelectorAll(".editInput");
    const newLocation = {
      nane: userInput[0].value,
      address: userInput[1].value,
      status: true,
    };
    axios
      .post(
        "https://meet-production-52c7.up.railway.app/api/location/new-location",
        newLocation
      )
      .then(message.success("Created new location successfully"))
      .catch(message.error("Created location failed"));
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        ADD PUBLIC LOCATIONS
      </Title>

      {/* Back button */}
      <Button
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
                  <Input className="editInput"></Input>
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
                  <Input className="editInput"></Input>
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
