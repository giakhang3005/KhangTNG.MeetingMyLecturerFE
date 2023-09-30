import { React, useState } from "react";
import { Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export function SearchBar(props) {
  //get function
  const setIsSearchingSubject = props.setIsSearchingSubject;

  //Handle search
  const handleSearch = (subject) => {
    setIsSearchingSubject(subject)
  }
  //! subjectsget from API
  const subjects = ["SWP391", "SWT301", "SWR302"];
  return (
    <Row>
      <Col xs={2} md={6}></Col>
      <Col xs={20} md={12}>
        <Select
          suffixIcon={<SearchOutlined />}
          placeholder="Ex: SWP391,..."
          showSearch
          allowClear
          onSelect={(value) => handleSearch(value)}
          options={subjects.map((subject) => ({
            value: subject,
            label: subject,
          }))}
          style={{
            width: "100%",
          }}
        ></Select>
      </Col>
      <Col xs={2} md={6}></Col>
    </Row>
  );
}
