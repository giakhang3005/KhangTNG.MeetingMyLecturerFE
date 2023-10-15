import React from "react";
import { Col, Row, Select } from "antd";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";

export function AdvancePopover(props) {
  const finalSearch = props.finalSearch,
    setFinalSearch = props.setFinalSearch;

  //Handle role
  const handleSelectRole = (role) => {
    setFinalSearch({...finalSearch, role: role})
  };
  const handleClearRole = () => {
    setFinalSearch({...finalSearch, role: null})
  };

  //Handle status
  const handleSelectStatus = (status) => {
    setFinalSearch({...finalSearch, status: status})
  };
  const handleClearStatus = () => {
    setFinalSearch({...finalSearch, status: null})
  };

  //test data
  const roleList = [
    { key: 0, label: "Admin" },
    { key: 1, label: "Lecturer" },
    { key: 2, label: "Student" },
  ];
  const statusList = [
    { key: false, label: "Disabled" },
    { key: true, label: "Active" },
  ];

  return (
    <>
      {/* Search Role */}
      <Row>
        <Col xs={12}>
          <Select
            suffixIcon={<UserOutlined />}
            placeholder="Select a role"
            allowClear
            onSelect={(role) => handleSelectRole(role)}
            onClear={handleClearRole}
            value={finalSearch.role}
            options={roleList.map((role) => ({
              value: role.key,
              label: role.label,
            }))}
            style={{
              width: "98%",
            }}
          ></Select>
        </Col>

        {/* Search Status */}
        <Col xs={12}>
          <Select
            suffixIcon={<InfoCircleOutlined />}
            placeholder="Select a status"
            allowClear
            onSelect={(status) => handleSelectStatus(status)}
            onClear={handleClearStatus}
            value={finalSearch.status}
            options={statusList.map((status) => ({
              value: status.key,
              label: status.label,
            }))}
            style={{
              width: "98%",
            }}
          ></Select>
        </Col>
      </Row>
    </>
  );
}
