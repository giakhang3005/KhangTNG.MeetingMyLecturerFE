import { React, useState, useContext } from "react";
import {
  Input,
  Button,
  message,
  Row,
  Col,
  Typography,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import { ConsoleSqlOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Data } from "../../../Body";

export function CreateSlotForm({
  isLoading,
  subjectsLoading,
  subjects,
  emails,
  locationsList,
  setCreatedSlotView,
}) {
  const { Title } = Typography;
  const { user } = useContext(Data);

  //push in to select format
  const pushSubjectList = (inputSubjects) => {
    const selectSubjects = inputSubjects.map((subject) => {
      return { value: subject.code, label: subject.code };
    });
    return selectSubjects;
  };

  //push in to select format
  const pushLocationList = (inputLocations) => {
    const selectLocations = inputLocations.map((loc) => {
      return { value: loc.id, label: loc.name };
    });
    return selectLocations;
  };

  //push in to select format
  const pushEmails = (emailsIn) => {
    const emailL = emailsIn.map((em) => {
      return { value: em, label: em };
    });
    return emailL;
  };

  //! STATE
  const [today, setToday] = useState(new dayjs());
  const [date, setDate] = useState(today);
  const [start, setStart] = useState(date.add(6, "hour"));
  const [end, setEnd] = useState(start.add(15, "minute"));
  const [mode, setMode] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //handle Date Change
  const handleDateChange = (newDate) => {
    if (newDate < today) {
      message.error("You can not create slot with date in the past");
    } else {
      setDate(newDate);
      //set new date/month/year for start time & end time
      setStart(
        newDate.date(newDate.date()).month(newDate.month()).year(newDate.year())
      );
      setEnd(
        newDate.date(newDate.date()).month(newDate.month()).year(newDate.year())
      );
    }
  };

  //handle State time change
  const handleStartChange = (newStart) => {
    if (newStart < today.add(6, "hour")) {
      message.error("You have to create slot at least 6 hours from now");
    } else {
      setStart(newStart);
      if (end.diff(newStart) < 900000) {
        setEnd(newStart.add(15, "minute"));
      }
    }
  };

  //handle End time change
  const handleEndChange = (newEnd) => {
    if (newEnd < start.add(15, "minute")) {
      message.error("Slot must be at least 15 minutes");
    } else {
      setEnd(newEnd);
    }
  };

  //handle mode change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    newMode == 2 && setStudentEmail(null);
  };

  //handle subject change
  const handleSubjectChange = (newSubjectList) => {
    setSelectedSubjects(newSubjectList);
  };

  //handle Location change
  const handleLocationChange = (newLoc) => {
    setLocationId(newLoc);
  };

  //handle Password change
  const [errMsgShown, setErrMsgShown] = useState(false);
  setInterval(() => {
    errMsgShown && setErrMsgShown(false);
  }, 4500);
  const handlePasswordChange = (e) => {
    if (e.target.value.indexOf(" ") === -1) {
      setPassword(e.target.value);
    } else {
      if (!errMsgShown) {
        message.error("Password can not contain space");
        setErrMsgShown(true);
      }
    }
  };

  //! handle submit
  const handleSubmit = () => {
    //conver time to string
    const dateString = `${date.$D < 10 ? `0${date.$D}` : date.$D}/${
      date.$M + 1 < 10 ? `0${date.$M + 1}` : date.$M + 1
    }/${date.$y}`;
    const startString = `${start.$H < 10 ? `0${start.$H}` : start.$H}:${
      start.$m < 10 ? `0${start.$m}` : start.$m
    }:00`;
    const endString = `${end.$H < 10 ? `0${end.$H}` : end.$H}:${
      end.$m < 10 ? `0${end.$m}` : end.$m
    }:00`;

    const newSlot = {
      lecturerId: user.id,
      meetingDay: dateString,
      startTime: startString,
      endTime: endString,
      mode: mode,
      studentEmail: mode === 2 ? studentEmail : null,
      locationId: locationId,
      subjectCode: selectedSubjects,
      password: password === "" ? null : password,
      // status: ,
    };

    if (newSlot.mode === 2 && newSlot.studentEmail === null) {
      message.error("You can not let student email empty in Assign Mode");
    } else {
      //validation empty
      let locErr = false,
        SubjErr = false;
    console.log(newSlot.locationId === {})
      newSlot.locationId === null && (locErr = true);
      newSlot.subjectCode.length === 0 && (SubjErr = true);

      if (!SubjErr && !locErr) {
        console.log(newSlot);
        console.log(JSON.stringify(newSlot))
        message.success("Created slot successfully");
        setCreatedSlotView("");
      } else {
        message.error("Location and Subject are required");
      }
    }
  };
  return (
    <>
      <Row className="requestsInfo">
        <Col xs={1}></Col>
        <Col xs={23}>
          {/* Date */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Date:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <DatePicker
                  style={{ width: "320px" }}
                  value={date}
                  format="DD/MM/YYYY"
                  onChange={(newDate) => handleDateChange(newDate)}
                />
              </Title>
            </Col>
          </Row>

          {/* Start */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Start:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <TimePicker
                  style={{ width: "320px" }}
                  format="HH:mm"
                  value={start}
                  onChange={(newStart) => handleStartChange(newStart)}
                />
              </Title>
            </Col>
          </Row>

          {/* End */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                End:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <TimePicker
                  style={{ width: "320px" }}
                  value={end}
                  format="HH:mm"
                  onChange={(newEnd) => handleEndChange(newEnd)}
                />
              </Title>
            </Col>
          </Row>

          {/* Mode */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Mode:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Select
                  style={Object.assign({ width: "320px" })}
                  defaultValue={mode}
                  onChange={(newMode) => handleModeChange(newMode)}
                >
                  <Select.Option value={0}>Manual Approve</Select.Option>
                  <Select.Option value={1}>
                    Accept the first Booker
                  </Select.Option>
                  <Select.Option value={2}>Assign Student</Select.Option>
                </Select>
              </Title>
            </Col>
          </Row>

          {/* Student email */}
          {mode === 2 && (
            <Row>
              <Col xs={9} md={3}>
                <Title className="InfoText ID" level={5}>
                  Student Email:
                </Title>
              </Col>
              <Col xs={15} md={10}>
                <Title
                  className="InfoText id"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Select
                    showSearch
                    style={Object.assign({ width: "320px" })}
                    options={pushEmails(emails)}
                    onChange={(newEmail) => setStudentEmail(newEmail)}
                  />
                </Title>
              </Col>
            </Row>
          )}

          {/* Location */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Location:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Select
                  style={{ minWidth: "320px" }}
                  className="editInput"
                  options={pushLocationList(locationsList)}
                  onChange={(newLoc) => handleLocationChange(newLoc)}
                ></Select>
              </Title>
            </Col>
          </Row>

          {/* Subject */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Subjects:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Select
                  style={Object.assign(
                    { minWidth: "320px" },
                    { maxWidth: "320px" }
                  )}
                  mode="multiple"
                  className="editInput"
                  options={pushSubjectList(subjects)}
                  onChange={(subjectsList) => handleSubjectChange(subjectsList)}
                ></Select>
              </Title>
            </Col>
          </Row>

          {/* Password */}
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Password{" "}
                <span style={Object.assign({ fontSize: "9px" })}>
                  (Optional)
                </span>
              </Title>
            </Col>
            <Col xs={15} md={10} style={{ height: "25px" }}>
              <Title
                className="InfoText id"
                level={5}
                style={Object.assign(
                  { fontWeight: "400" },
                  { animation: "fade 0.2s ease-out" }
                )}
              >
                <Input
                  className="editInput"
                  placeholder="Leave it empty if no password"
                  maxLength={25}
                  style={{ width: "320px" }}
                  showCount
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
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
              {/* Create */}
              <Button
                loading={subjectsLoading || isLoading}
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
    </>
  );
}
