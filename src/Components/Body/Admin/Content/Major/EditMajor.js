import { React, useState } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Input, message, Spin } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function EditMajor({ setMenuOpt, editMajor }) {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    const name = document.querySelector(".ant-input").value;
    const newMajor = {id: editMajor.id, name: name}

    //check length
    if (name.length >= 8) {
      axios
        .put(`https://meet-production-52c7.up.railway.app/api/major/${newMajor.id}`, newMajor)
        .then(() => {
          message.success("Updated major successfully");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
        message.error('Major name must be at least 8 characters')
        setLoading(true);
    }
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        EDIT MAJORS
      </Title>

      {/* Back button */}
      <Button
        disabled={loading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("majorsManage")}
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
                    maxLength={50}
                    showCount
                    defaultValue={editMajor.name}
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
