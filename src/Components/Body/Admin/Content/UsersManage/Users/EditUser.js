import { React, useState } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Select, Input, message } from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";

export function EditUser({ userEdit, setUidEditUser, setMenuOpt }) {
  const { Title } = Typography;
  // Email check
  const fptEmail = "@fpt.edu.vn",
    feEmail = "@fe.edu.vn";

  const [loading, setLoading] = useState(false);

  const reverseRole = (role) => {
    switch (role) {
      case "Admin":
        return 0;
      case "Lecturer":
        return 1;
      case "Student":
        return 2;
    }
  };

  const handleUpdate = async () => {
    const infoText = document.querySelectorAll(".InfoText");
    const editInput = document.querySelectorAll(".editInput");
    let newUser = {
      id: editInput[0].value,
      name: editInput[1].value,
      email: editInput[2].value,
      password:
        editInput[2].value.includes(fptEmail) ||
        editInput[2].value.includes(feEmail)
          ? null
          : editInput[3].value,
      role: reverseRole(infoText[9].textContent),
      status: infoText[11].textContent === "Active" ? true : false,
    };

    let emailCheck = false,
      stringCheck = false;
    //check for gmail
    if (!newUser.email.includes("@")) {
      message.error("You must enter an email address");
      emailCheck = true;
    } else {
      //check for fpt @ fe
      if (newUser.email.includes(fptEmail) || newUser.email.includes(feEmail)) {
        if (!(newUser.email === userEdit.email)) {
          message.error("you can not use FPT or FE email address");
          emailCheck = true;
        }
      }
    }

    //check for password
    if (newUser.password === "" || newUser.name === "") {
      stringCheck = true;
      message.error("Name, Password can not be empty");
    }

    if (!emailCheck && !stringCheck) {
      setLoading(true);
      await axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/v1/account/put/${newUser.id}`,
          newUser
        )
        .then(() => {
          message.success("Updated successfully");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPDATE USER
      </Title>

      {/* Back button */}
      <Button
        disabled={loading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("usersManage")}
      >
        Back
      </Button>

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
                  defaultValue={userEdit.id}
                ></Input>
              </Title>
            </Col>
          </Row>

          {/* Name */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Name:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText name"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Input
                  className="editInput"
                  defaultValue={userEdit.name}
                ></Input>
              </Title>
            </Col>
          </Row>

          {/* Email */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Email:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Input
                  disabled={
                    userEdit.email.includes(fptEmail) ||
                    userEdit.email.includes(feEmail)
                      ? true
                      : false
                  }
                  className="editInput"
                  defaultValue={userEdit.email}
                ></Input>
              </Title>
            </Col>
          </Row>

          {/* password */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Password:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText password"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Input
                  disabled={
                    userEdit.email.includes(fptEmail) ||
                    userEdit.email.includes(feEmail)
                      ? true
                      : false
                  }
                  className="editInput"
                  defaultValue={userEdit.password}
                ></Input>
              </Title>
            </Col>
          </Row>

          {/* Role */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Role:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText role"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Select
                disabled
                  defaultValue={userEdit.role}
                  options={[
                    {
                      label: "Admin",
                      value: 0,
                    },
                    {
                      label: "Lecturer",
                      value: 1,
                    },
                    {
                      label: "Student",
                      value: 2,
                    },
                  ]}
                ></Select>
              </Title>
            </Col>
          </Row>

          {/* Role */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Status:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText status"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Select
                  defaultValue={userEdit.status}
                  options={[
                    {
                      label: "Disabled",
                      value: false,
                    },
                    {
                      label: "Active",
                      value: true,
                    },
                  ]}
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
    </>
  );
}
