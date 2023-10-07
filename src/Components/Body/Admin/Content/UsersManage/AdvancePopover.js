import React from "react";
import { Col, Row, Select, Typography } from "antd";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";

export function AdvancePopover(props) {
  const finalSearch = props.finalSearch,
    searchRole = props.searchRole,
    setSearchRole = props.setSearchRole,
    searchStatus = props.searchStatus,
    setSearchStatus = props.setSearchStatus;

    const {Text, Title} = Typography;

  //Handle role
  const handleSelectRole = (role) => {
    setSearchRole(role);
  };
  const handleClearRole = () => {
    setSearchRole(null);
  };

  //Handle status
  const handleSelectStatus = (status) => {
    setSearchStatus(status);
  };
  const handleClearStatus = () => {
    setSearchStatus(null);
  };

  //test data
  const roleList = [{key: 0, label: "Admin"},{key: 1, label: "Lecturer"},{key: 2, label: "Student"}];
  const statusList = [{key: 0, label: "Disabled"},{key: 1, label: "Active"}];

  return (
    <>
    {/* Search Role */}
      <Row style={{ margin: "15px 0 0 0" }}>
        <Col xs={4}>
        <Text
            style={Object.assign({ fontSize: "18px" })}
          >
            Role:
          </Text>
        </Col>
        <Col xs={20}>
          <Select
            suffixIcon={<UserOutlined />}
            placeholder="Select an option"
            allowClear
            onSelect={(role) => handleSelectRole(role)}
            onClear={handleClearRole}
            value={searchRole}
            options={roleList.map((role) => ({
              value: role.key,
              label: role.label,
            }))}
            style={{
              width: "100%",
            }}
          ></Select>
        </Col>
      </Row>

      {/* Search Status */}
      <Row style={{ margin: "15px 0 0 0" }}>
        <Col xs={4}>
          <Text
            style={Object.assign({ fontSize: "18px" })}
          >
            Status:
          </Text>
        </Col>
        <Col xs={20}>
          <Select
            suffixIcon={<InfoCircleOutlined />}
            placeholder="Select an option"
            allowClear
            onSelect={(status) => handleSelectStatus(status)}
            onClear={handleClearStatus}
            value={searchStatus}
            options={statusList.map((status) => ({
              value: status.key,
              label: status.label,
            }))}
            style={{
              width: "100%",
            }}
          ></Select>
        </Col>
      </Row>
    </>
  );
}
