import { React, useState, useEffect } from "react";
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
  Popover,
} from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { GooglemeetLogo } from "../../../../../../Hooks/All/SVG";

export function EditLecturers({ setMenuOpt, lecturerEdit }) {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const fptEmail = "@fpt.edu.vn";

  //! getting all subjectlist
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectSubjectsList, setSelectSubjectsList] = useState([]);
  const [convertSubjectList, setConvertSubjectList] = useState([]);
  //fetching subjects
  const getSubjectList = () => {
    setLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/subject/status")
      .then(
        (response) => (
          setSubjectsList(response.data),
          setSelectSubjectsList(pushSubjectList(response.data)),
          setLoading(false)
        )
      )
      .catch((error) => (console.error(error), setLoading(false)));
  };

  //check phone number/text contain only digits
  const checkOnlyDigits = (string) =>
    [...string].every((c) => "0123456789".includes(c));

  //push in to select format
  const pushSubjectList = (inputSubjects) => {
    const selectSubjects = inputSubjects.map((subject) => {
      return { value: subject.code, name: subject.code };
    });
    return selectSubjects;
  };

  useEffect(() => {
    getSubjectList();
  }, []);

  //check email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //! handle submit
  const handleSubmit = () => {
    setLoading(true);
    const UInput = document.querySelectorAll(".editInput");

    const newLecturer = {
      id: lecturerEdit.id,
      name: lecturerEdit.name,
      phone: UInput[1].value,
      email: UInput[2].value,
      note: UInput[4].value,
      subjectList: convertSubjectList,
    };

    let phoneErr = true;
    newLecturer.phone.length > 9 &&
    newLecturer.phone.length < 12 &&
    checkOnlyDigits(newLecturer.phone)
      ? (phoneErr = false)
      : (phoneErr = true);

    const validEmail =
      validateEmail(newLecturer.email) &&
      !newLecturer.email?.includes(fptEmail);

    !phoneErr && validEmail ? (
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/lecturer/${newLecturer.id}`,
          newLecturer
        )
        .then(
          (res) => (message.success("Updated successfully"), setLoading(false))
        )
        .catch(
          (err) => (
            console.error(err),
            setLoading(false),
            message.error("Failed to update")
          )
        )
    ) : (
      <>
        {phoneErr &&
          message.error("Phone number must contain 10 or 11 numbers")}
        {!validEmail &&
          message.error(
            "You must enter a valid email address and not FPT Email"
          )}
        {setLoading(false)}
      </>
    );
  };

  //! handle subject change
  const handleSubjectChange = (subjects) => {
    let subjectsFilteredList = [];
    subjects.map((subject) => {
      subjectsList.filter((oriSubject) => {
        subject === oriSubject.code &&
          subjectsFilteredList.push({
            subjectId: oriSubject.id,
            subjectCode: oriSubject.code,
          });
      });
    });
    setConvertSubjectList(subjectsFilteredList);
  };

  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPDATE LECTURERS
      </Title>

      {/* Back button */}
      <Button
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("lecturersManage")}
      >
        Back
      </Button>

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
                  disabled
                  className="editInput"
                  defaultValue={lecturerEdit.name}
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
                  defaultValue={lecturerEdit.phone}
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
                  defaultValue={lecturerEdit.email}
                ></Input>
              </Title>
            </Col>
          </Row>

          {/* Subjects */}

          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}>
                Teaching:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Spin spinning={loading} tip="Preparing Subjects...">
                  <Select
                    style={{ width: "100%" }}
                    mode="multiple"
                    className="editInput"
                    defaultValue={lecturerEdit.subjectList.map((subject) => {
                      const code = subject.subjectCode;
                      return code;
                    })}
                    options={selectSubjectsList}
                    onChange={(subjects) => handleSubjectChange(subjects)}
                  ></Select>
                </Spin>
              </Title>
            </Col>
          </Row>

          {/* Locations */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Locations:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={Object.assign(
                  { fontWeight: "400" },
                  { display: "flex" }
                )}
              >
                {lecturerEdit.linkMeet === null &&
                  lecturerEdit.locationList.length === 0 &&
                  "No Location"}
                {lecturerEdit.linkMeet !== null && (
                  <a href={`https://${lecturerEdit.linkMeet}`} target="_blank">
                    <Tag
                      style={Object.assign(
                        { display: "flex" },
                        { alignItems: "center" },
                        { width: "106px" },
                        { justifyContent: "space-between" }
                      )}
                      icon={<GooglemeetLogo />}
                      color="geekblue"
                    >
                      Google Meet
                    </Tag>
                  </a>
                )}
                {lecturerEdit.locationList.map((location, i) => {
                  return (
                    <Popover key={i} content={location.locationAddress}>
                      <Tag color="orange">{location.locationName}</Tag>
                    </Popover>
                  );
                })}
              </Title>
            </Col>
          </Row>

          {/* NOTE */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Note:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={Object.assign(
                  { fontWeight: "400" },
                  { minHeight: "70px" }
                )}
              >
                <Input.TextArea
                  disabled
                  maxLength={200}
                  showCount
                  className="editInput"
                  defaultValue={lecturerEdit.note}
                ></Input.TextArea>
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
    </>
  );
}
