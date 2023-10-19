import { React, useState, useContext, useEffect } from "react";
import {
  Input,
  Button,
  message,
  Row,
  Col,
  Typography,
  Spin,
  Select,
} from "antd";
import { FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Data } from "../../../../Body";
import axios from "axios";

export function LecturerInfo() {
  const { Title } = Typography;
  const { user } = useContext(Data);

  //! subject from API
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const getSubjects = () => {
    setSubjectsLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/subject/status")
      .then((response) => setSubjects(response.data))
      .catch((error) => console.error(error))
      .finally(() => setSubjectsLoading(false));
  };

  //! users info from API
  const [lecturer, setLecturer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getLecturer = () => {
    setIsLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/${user.email}`
      )
      .then(
        (response) => (
          setLecturer(response.data.data),
          pushSubjectToValue(response.data.data.subjectList)
        )
      );
  };

  useEffect(() => {
    getSubjects();
    getLecturer();
  }, []);

  //selected subjects
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  //push into value array
  const pushSubjectToValue = (inputSubj) => {
    let array = [];
    inputSubj?.map((subject) => {
      array.push(subject.subjectCode);
    });

    setSelectedSubjects(array);
  };

  //push in to select format
  const pushSubjectList = (inputSubjects) => {
    const selectSubjects = inputSubjects.map((subject) => {
      return { value: subject.code, label: subject.code };
    });
    return selectSubjects;
  };

  //handle subject change
  const handleSubjectChange = (newSubjectList) => {
    setSelectedSubjects(newSubjectList);
  };

  //! handle subject change
  const convertSubject = () => {
    let selected = [];

    selectedSubjects.forEach((SubjCode) => {
      subjects.forEach((subj) => {
        subj.code === SubjCode &&
          selected.push({ subjectId: subj.id, subjectCode: subj.code });
      });
    });
    return selected;
  };

  //handle phone change
  const handlePhoneChange = (e) => {
    setLecturer({ ...lecturer, phone: e.target.value });
  };

  const checkOnlyDigits = (string) =>
    [...string].every((c) => "0123456789".includes(c));

  //handle submit
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    const newLecturer = {
      id: lecturer.id,
      name: lecturer.name,
      email: lecturer.email,
      phone: lecturer.phone,
      subjectList: convertSubject(),
    };

    let phoneErr = false;
    newLecturer.phone.length > 9 &&
    newLecturer.phone.length < 12 &&
    checkOnlyDigits(newLecturer.phone)
      ? (phoneErr = true)
      : (phoneErr = false);

    if (phoneErr) {
      setLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/lecturer/${newLecturer.id}`,
          newLecturer
        )
        .then(() => message.success("Updated successfully"))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      message.error("Phone number must from 10 to 11 numbers");
    }
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        PERSONAL INFORMATIONS
      </Title>
      <Spin spinning={subjectsLoading} tip="Prepairing your Data...">
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
                    value={lecturer.name}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* NAME */}
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
                    value={lecturer.email}
                    disabled
                  ></Input>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
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
                    value={lecturer.phone}
                    maxLength={11}
                    showCount
                    onChange={(e) => handlePhoneChange(e)}
                  ></Input>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* subjects */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Teaching:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title className="InfoText id" level={5}>
                  <Select
                    value={selectedSubjects}
                    mode="multiple"
                    style={Object.assign({ width: "100%" })}
                    options={pushSubjectList(subjects)}
                    onChange={(subjectsList) =>
                      handleSubjectChange(subjectsList)
                    }
                  ></Select>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Buttons */}
        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* subjects */}
            <Row>
              <Col xs={9} md={3}></Col>
              <Col xs={15} md={10}>
                <Title className="InfoText id" level={5}>
                  <Button
                    loading={loading}
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
