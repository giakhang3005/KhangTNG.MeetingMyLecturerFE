import { React, useState, useEffect, useContext } from "react";
import {
  Col,
  Row,
  Typography,
  Button,
  Select,
  Input,
  message,
  Tag,
  Spin,
  DatePicker,
} from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { Data } from "../../../../Body";
import dayjs from "dayjs";

export function StudentInformations() {
  const { user } = useContext(Data);
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});
  const fptEmail = "@fpt.edu.vn";

  const getStudentData = () => {
    setLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/student?id=${user.id}`
      )
      .then(
        (response) => (
          setStudent(response.data.data), prepareState(response.data.data)
        )
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStudentData();
  }, []);

  //! STATE
  const [dob, setDob] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const prepareState = (data) => {
    if (data.dob === null) {
      setDob(null);
    } else {
      const dateSplit = data.dob.split("/");
      const dobDate = new dayjs()
        .set("date", dateSplit[0])
        .set("month", dateSplit[1] - 1)
        .set("year", dateSplit[2]);
      setDob(dobDate);
    }
    setPhone(data.phone);
    setAddress(data.address);
  };

  const handleDobchange = (newDob) => {
    const today = new dayjs();
    if (today.$y - newDob?.$y < 18) {
      message.error("You must be at least 18 years old to study university");
    } else {
      setDob(newDob);
    }
  };

  //check phone
  const checkOnlyDigits = (string) =>
    string === null || string === undefined
      ? false
      : [...string].every((c) => "0123456789".includes(c));

  const handleSubmit = () => {
    const dobString =
      dob !== null
        ? `${dob.$D < 10 ? `0${dob.$D}` : dob.$D}/${
            dob.$M + 1 < 10 ? `0${dob.$M + 1}` : dob.$M + 1
          }/${dob.$y}`
        : null;

    const newStudent = {
      name: student.name,
      code: student.code,
      email: student.email,
      curriculum: student.curriculum,
      id: user.id,
      dob: dobString,
      phone: phone,
      address: address,
      status: true,
    };

    const dobErr = dob === null ? true : false;
    const phoneErr =
      newStudent.phone?.length < 10 ||
      newStudent.phone?.length > 11 ||
      !checkOnlyDigits(newStudent.phone) 
        ? true
        : false;

    if (!dobErr && !phoneErr) {
      // console.log(newStudent)
      setLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/v1/student`,
          newStudent
        )
        .then((res) => message.success("Updated successfully"))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      dobErr && message.error("Date of birth can not be empty");
      phoneErr && message.error("Phone number must from 10 - 11 numbers");
    }
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        PERSONAL INFORMATIONS
      </Title>
      <Spin spinning={loading}>
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
                  <Input
                    className="editInput"
                    value={student?.name}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>

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
                    className="editInput"
                    value={student?.code}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* DOB */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Date of birth:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    value={dob}
                    format="DD/MM/YYYY"
                    onSelect={(newDob) => handleDobchange(newDob)}
                    onChange={(newDob) => handleDobchange(newDob)}
                  />
                </Title>
              </Col>
            </Row>

            {/* Email */}
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
                    className="editInput"
                    value={student?.email}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Phone */}
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
                    showCount
                    maxLength={11}
                    placeholder="Required"
                    className="editInput"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Curriculum */}
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
                    className="editInput"
                    value={student?.curriculum}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Major */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Major:
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
                    value={student?.majorName}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>

            {/* Address */}
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
                    placeholder="Not required"
                    className="editInput"
                    value={address}
                    maxLength={200}
                    showCount
                    onChange={(e) => setAddress(e.target.value)}
                  ></Input>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            <Row>
              <Col xs={9} md={3}></Col>
              <Col xs={15} md={10}>
                <Title className="InfoText id" level={5}>
                  <Button
                    disabled={loading}
                    type="primary"
                    icon={<FormOutlined />}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
