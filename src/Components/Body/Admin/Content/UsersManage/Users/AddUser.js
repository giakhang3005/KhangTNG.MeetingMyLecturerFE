import { React, useState } from "react";
import axios from "axios";
import { Col, Row, Typography, Button, Select, Input, message } from "antd";
import { UserAddOutlined, LeftOutlined } from "@ant-design/icons";

export function AddUser({ setMenuOpt }) {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  // Email check
  const fptEmail = "@fpt.edu.vn",
    feEmail = "@fe.edu.vn";

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
      password: editInput[3].value,
      role: 0, //reverseRole(infoText[9].textContent)
      status: true, //infoText[11].textContent === "Active" ? true : false
    };

    let emailCheck = false,
      stringCheck = false;
    //check for gmail
    if (!newUser.email.includes("@")) {
      message.error("You must enter an email address");
      emailCheck = true;
    } else {
      //check for fpt @ fe
      if (newUser.email.includes(fptEmail)) {
        message.error("You can not use FPT & FE email");
        emailCheck = true;
      }
    }

    //check for password
    if (newUser.password === "" || newUser.id === "" || newUser.name === "") {
      stringCheck = true;
      message.error("Id, Name, Password can not be empty");
    }

    if (!emailCheck && !stringCheck) {
      setLoading(true);
      await axios
        .get(
          `https://meet-production-52c7.up.railway.app/api/v1/account/get/${newUser.id}`
        )
        .then(() => {
          setLoading(false);
          message.error("User aldready exist");
        })
        .catch(() => {
          axios
            .post(
              "https://meet-production-52c7.up.railway.app/api/v1/account/post",
              newUser
            )
            .then((response) => {
              if (response.status === 200) {
                message.success("Created successfully");
                setMenuOpt("usersManage");
              } else {
                message.error("Failed to create user");
              }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        });
    }
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        CREATE USER
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
                User ID:
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
                <Input className="editInput"></Input>
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
                <Input className="editInput"></Input>
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
                <Input className="editInput"></Input>
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
                {/* <Select
                  required
                  defaultValue={2}
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
                ></Select> */}
                Admin
              </Title>
            </Col>
          </Row>

          {/* Status */}
          {/* <Row>
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
                  defaultValue={true}
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
          </Row> */}

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
                icon={<UserAddOutlined />}
                onClick={handleUpdate}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
