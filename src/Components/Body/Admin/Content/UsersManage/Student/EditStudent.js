import { React, useState } from "react";
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

export function EditStudent({ setMenuOpt, studentEdit }) {
  const { Title } = Typography;

  const [loading, setLoading] = useState(false)
  const handleSubmit = () => {
    setLoading(true)
    const UInput = document.querySelectorAll('.editInput')

    const newStudent = {
      id: studentEdit.id,
      code: studentEdit.code,
      name: studentEdit.name,
      phone: UInput[2].value,
      dob: UInput[3].value,
      address: studentEdit.address,
      email: studentEdit.email,
      curriculum: studentEdit.curriculum,
      status: studentEdit.status,
    }

    console.log(newStudent)
  }
  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPDATE STUDENTS
      </Title>

      {/* Back button */}
      <Button
        disabled={loading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("studentsManage")}
      >
        Back
      </Button>

      <Spin spinning={false}>
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* MSSV */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  MSSV:
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
                    defaultValue={studentEdit.code}
                  ></Input>
                </Title>
              </Col>
            </Row>

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
                    disabled
                    className="editInput"
                    defaultValue={studentEdit.name}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* DOB */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  DOB:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input
                    className="editInput"
                    defaultValue={studentEdit.dob}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* PHONE */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Phone:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input
                    className="editInput"
                    defaultValue={studentEdit.phone}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* EMAIL */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Email:
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
                    defaultValue={studentEdit.email}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* CURRICULUM */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Curriculum:
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
                    defaultValue={studentEdit.curriculum}
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
                    disabled
                    className="editInput"
                    defaultValue={studentEdit.address}
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
                  loading={loading}
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
