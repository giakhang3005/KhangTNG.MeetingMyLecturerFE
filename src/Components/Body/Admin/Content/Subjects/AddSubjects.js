import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Typography,
  Button,
  Select,
  Input,
  message,
  Spin,
} from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function AddSubjects({ setMenuOpt }) {
  const [majors, setMajors] = useState([]);
  const [majorLoading, setMajorLoading] = useState(false);
  const [selectedMajors, setSelectedMajors] = useState([]);
  useEffect(() => {
    setMajorLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/major")
      .then((response) => setMajors(response.data))
      .finally(() => setMajorLoading(false));
  }, []);

  //set options format
  const marjList = majors.map((subject) => {
    return {
      value: subject.id,
      label: subject.name,
    };
  });

  //handle Major change
  const handleMajorChange = (major) => {
    //return to id, name format
    const majorSelected = [];
    major.map((majId) => {
      majorSelected.push({
        id: majId,
        name: marjList[majId - 1].label,
      });
    });
    setSelectedMajors(majorSelected);
  };

  //handle Submit
  const handleSubmit = () => {
    const editInput = document.querySelectorAll(".editInput");
    const selectedOptions = document.querySelectorAll(
      ".ant-select-selection-item"
    );

    const newMajor = {
      code: editInput[0].value,
      name: editInput[1].value,
      semester: selectedOptions[0].textContent,
      status: selectedOptions[1].textContent === "ACTIVE" ? true : false,
      major: selectedMajors,
    };

    //Error validation
    let codeErr = true,
      nameErr = true,
      majErr = true;
    newMajor.code.length < 4
      ? message.error("Code must be at least 4 characters")
      : (codeErr = false);

    newMajor.name.length < 8
      ? message.error("Name must be at least 8 characters")
      : (nameErr = false);

    selectedMajors?.length < 1 || selectedMajors === null
      ? message.error("You must assign at least 1 major")
      : (majErr = false);

    
  };

  const { Title } = Typography;
  return (
    <>
      <Title className="sectionTitle" level={3}>
        CREATE SUBJECTS
      </Title>

      {/* Back button */}
      <Button
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("subjectsManage")}
      >
        Back
      </Button>

      <Spin spinning={majorLoading}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* CODE */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  CODE:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input className="editInput"></Input>
                </Title>
              </Col>
            </Row>

            {/* NAME */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  NAME:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input className="editInput"></Input>
                </Title>
              </Col>
            </Row>

            {/* SEMESTER */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  SEMESTER:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Select
                    className="editInput"
                    defaultValue={1}
                    options={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                      { value: 4, label: 4 },
                      { value: 5, label: 5 },
                      { value: 6, label: 6 },
                      { value: 7, label: 7 },
                      { value: 8, label: 8 },
                      { value: 9, label: 9 },
                    ]}
                  ></Select>
                </Title>
              </Col>
            </Row>

            {/* NAME */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  STATUS:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Select
                    className="editInput"
                    defaultValue={true}
                    options={[
                      { value: true, label: "ACTIVE" },
                      { value: false, label: "DISABLED" },
                    ]}
                    style={{ minWidth: "120px" }}
                  ></Select>
                </Title>
              </Col>
            </Row>

            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText" level={5}>
                  MAJOR:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Select
                    style={{ minWidth: "220px" }}
                    mode="multiple"
                    className="editInput"
                    options={marjList}
                    onChange={(maj) => handleMajorChange(maj)}
                  ></Select>
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
                  loading={majorLoading}
                  type="primary"
                  style={{ margin: "12px 8px 0 0" }}
                  icon={<FormOutlined />}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
