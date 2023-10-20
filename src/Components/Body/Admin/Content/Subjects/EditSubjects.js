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

export function EditSubjects({ setMenuOpt, subjectEdit }) {
  const [majors, setMajors] = useState([]);
  const [majorLoading, setMajorLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedMajors, setSelectedMajors] = useState([]);
  useEffect(() => {
    setMajorLoading(true);
    setSelectedMajors(subjectEdit.majorList);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/major")
      .then((response) => setMajors(response.data))
      .catch((err) => console.error(err))
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
  const handleMajorChange = (majorId) => {
    //return to id, name format
    const majorSelected = [];
    majorId.map((majId) => {
      majorSelected.push({
        majorId: majId,
        majorName: marjList[majId - 1].label,
      });
    });
    setSelectedMajors(majorSelected);
  };

  //push all major id in an array
  const defaultMajor = subjectEdit.majorList.map((major) => {
    return major.majorId;
  });

  //handle Update
  const handleUpdate = () => {
    const editInput = document.querySelectorAll(".editInput");
    const semester = document.querySelector(
      ".ant-select-selection-item"
    ).textContent;

    const CodeFirst =editInput[1].value.substring(0, 3).toUpperCase();
    const CodeSecond = editInput[1].value.slice(3)

    const newMajor = {
      id: editInput[0].value,
      code: `${CodeFirst}${CodeSecond}`,
      name: editInput[2].value,
      semester: semester,
      majorList: selectedMajors,
    };
    
    if (
      newMajor.code.length === 0 ||
      newMajor.name.length === 0 ||
      newMajor.majorList?.length === 0 ||
      newMajor.majorList === null ||
      newMajor.majorList === undefined
    ) {
      message.error("Code, Major, Name can not be empty");
    } else {
      setUpdateLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/v1/subject/${newMajor.id}`,
          newMajor
        )
        .then((res) => {
          if(res.data.data === "") {
            message.success("Updated successfully")
          } else {
            message.error(res.data.message)
          }
        })
        .catch(() => message.error("Failed to update, please try again"))
        .finally(() => setUpdateLoading(false));
    }
  };

  const { Title } = Typography;

  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPDATE SUBJECTS
      </Title>

      {/* Back button */}
      <Button
        disabled={updateLoading}
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
            {/* ID */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  ID:
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
                    defaultValue={subjectEdit.id}
                  ></Input>
                </Title>
              </Col>
            </Row>

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
                  <Input
                    className="editInput"
                    defaultValue={subjectEdit.code}
                  ></Input>
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
                  <Input
                    className="editInput"
                    defaultValue={subjectEdit.name}
                  ></Input>
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
                    defaultValue={subjectEdit.semester}
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
                  <Input
                    disabled
                    className="editInput"
                    defaultValue={subjectEdit.status ? "ACTIVE" : "DISABLED"}
                  ></Input>
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
                    defaultValue={defaultMajor}
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
                  loading={updateLoading}
                  type="primary"
                  style={{ margin: "12px 8px 0 0" }}
                  icon={<FormOutlined />}
                  onClick={handleUpdate}
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
