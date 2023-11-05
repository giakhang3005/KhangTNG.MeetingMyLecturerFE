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
import { FormOutlined, LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Data } from "../../../../Body";
import axios from "axios";
import { GooglemeetLogo } from "../../../../../../Hooks/All/SVG";

export function LecturerInfo() {
  const { Title } = Typography;
  const { user, setMenuOpt } = useContext(Data);
  const fptEmail = "@fpt.edu.vn";

  //! subject from API
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const getSubjects = () => {
    if (
      localStorage.getItem("subjects") !== null &&
      localStorage.getItem("subjects") !== "undefined"
    ) {
      setSubjects(JSON.parse(localStorage.getItem("subjects")));
    } else {
      setSubjectsLoading(true);
      axios
        .get("https://meet-production-52c7.up.railway.app/api/subject/status")
        .then(
          (response) => (
            setSubjects(response.data),
            localStorage.setItem("subjects", JSON.stringify(response.data))
          )
        )
        .finally(() => setSubjectsLoading(false));
    }
  };

  //! users info from API
  const [lecturer, setLecturer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getLecturer = () => {
    setIsLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/${user.id}`
      )
      .then(
        (response) => (
          setLecturer(response.data),
          pushSubjectToValue(response.data.subjectList)
        )
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
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
      array.push(subject?.subjectCode);
    });

    setSelectedSubjects(array);
  };

  //push in to select format
  const pushSubjectList = (inputSubjects) => {
    const selectSubjects = inputSubjects?.map((subject) => {
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

  //handle meet change
  const handleMeetChange = (e) => {
    setLecturer({
      ...lecturer,
      linkMeet: e.target.value.replace(
        "https://meet.google.com/",
        "meet.google.com/"
      ),
    });
  };

  //handle note change
  const handleNoteChange = (e) => {
    setLecturer({ ...lecturer, note: e.target.value });
  };

  //handle email change
  const handleEmailChange = (e) => {
    e.target.value.includes("@fpt")
      ? message.error("Custom email cannot be FPT Email")
      : setLecturer({ ...lecturer, email: e.target.value });
  };

  //check phone
  const checkOnlyDigits = (string) =>
    [...string].every((c) => "0123456789".includes(c));

  //check email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //handle submit
  const [loading, setLoading] = useState(false);
  const meetformat =
    "meet.google.com/[a-zA-Z][a-zA-Z][a-zA-Z]-[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]-[a-zA-Z][a-zA-Z][a-zA-Z]$";
  const handleSubmit = () => {
    const newLecturer = {
      id: lecturer.id,
      name: lecturer.name,
      email: lecturer.email,
      phone: lecturer.phone,
      linkMeet: lecturer.linkMeet,
      subjectList: convertSubject(),
      note: lecturer.note,
    };

    const validEmail = validateEmail(newLecturer.email);

    let phoneErr = false;
    newLecturer.phone.length > 9 &&
    newLecturer.phone.length < 12 &&
    checkOnlyDigits(newLecturer.phone)
      ? (phoneErr = true)
      : (phoneErr = false);

    let meetErr = newLecturer.linkMeet.match(meetformat);

    if (phoneErr && validEmail && meetErr) {
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
      //phone error = true -> execute
      !phoneErr && message.error("Phone number must from 10 to 11 numbers");
      //validEmail = false -> execute
      !validEmail && message.error("Invalid Email address");
      !meetErr && message.error("You have to enter a valid google meet link");
    }
  };
  return (
    <>
      <Button
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setMenuOpt("lecturerCfg")}
      >
        Back
      </Button>
      <Title className="sectionTitle" level={3}>
        PERSONAL INFORMATIONS
      </Title>
      <Spin spinning={isLoading}>
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
                    value={lecturer?.name}
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
                    value={lecturer?.email}
                    onChange={(e) => handleEmailChange(e)}
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
                    placeholder="Required"
                    disabled={loading}
                    className="editInput"
                    value={lecturer?.phone}
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
                  <Spin spinning={subjectsLoading} tip="Preparing Subjects...">
                    <Select
                      placeholder="Not required"
                      disabled={loading}
                      value={selectedSubjects}
                      mode="multiple"
                      style={Object.assign(
                        { width: "100%" },
                        { fontWeight: 400 }
                      )}
                      options={pushSubjectList(subjects)}
                      onChange={(subjectsList) =>
                        handleSubjectChange(subjectsList)
                      }
                    ></Select>
                  </Spin>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* ggmeet */}
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Google Meet:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Input
                    placeholder="Please create a Google Meet and copy it's link to this box"
                    className="editInput"
                    suffix={
                      lecturer?.linkMeet?.match(meetformat) && (
                        <a
                          href={lecturer.linkMeet}
                          target="_blank"
                          style={Object.assign(
                            { scale: "1.2" },
                            { margin: "2.5px 0 0 0" }
                          )}
                        >
                          <GooglemeetLogo />
                        </a>
                      )
                    }
                    value={lecturer?.linkMeet}
                    onChange={(e) => handleMeetChange(e)}
                  ></Input>
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="requestsInfo">
          <Col xs={1}></Col>
          <Col xs={23}>
            {/* Note */}
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
                  style={Object.assign({ minHeight: "65px" })}
                >
                  <Input.TextArea
                    style={{ fontWeight: 400 }}
                    placeholder="Introduce about yourself (Not required)"
                    disabled={loading}
                    className="editInput"
                    value={lecturer?.note}
                    maxLength={200}
                    showCount
                    onChange={(e) => handleNoteChange(e)}
                  ></Input.TextArea>
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
