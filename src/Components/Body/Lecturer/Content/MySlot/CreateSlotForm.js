import { React, useState, useContext, useEffect } from "react";
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
  Spin,
  Checkbox,
  Radio,
  Tag,
  notification,
  Popover,
} from "antd";
import { FormOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Data } from "../../../Body";
import axios from "axios";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export function CreateSlotForm({
  isLoading,
  subjectsLoading,
  subjects,
  emails,
  locationsList,
  setCreatedSlotView,
  setIsLoading,
  getData,
  clearBackup,
}) {
  const { Title } = Typography;
  const { user, setMenuOpt } = useContext(Data);

  const [linkMeet, setLinkMeet] = useState(null);
  const getLinkMeet = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/lecturer/linkMeet?id=${user.id}`
      )
      .then((response) => setLinkMeet(response.data.data))
      .catch((error) => console.log(error));
  };

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
  const today = new dayjs();
  const [date, setDate] = useState(today.add(6, "hour"));
  const [start, setStart] = useState(date);
  const [end, setEnd] = useState(start.add(15, "minute"));
  const [mode, setMode] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [hasPassword, setHasPassword] = useState(false);
  const [type, setType] = useState("offline");

  //handle Date Change
  const handleDateChange = (newDate) => {
    const changedDate = newDate.hour(start.hour()).minute(start.minute());
    if (changedDate < today) {
      message.error("You have to create slot at least 6 hours from now");
    } else {
      setDate(newDate);
      //set new date/month/year for start time & end time
      setStart(
        newDate
          .set("date", newDate.date())
          .month(newDate.month())
          .year(newDate.year())
          .hour(start.hour())
          .minute(start.minute())
      );
      setEnd(
        newDate
          .set("date", newDate.date())
          .month(newDate.month())
          .year(newDate.year())
          .hour(end.hour())
          .minute(end.minute())
      );
    }
  };

  //handle State time change
  const handleStartChange = (newStart) => {
    const startHour = newStart
      .date(date.date())
      .month(date.month())
      .year(date.year());
    if (startHour < today.add(6, "hour")) {
      message.error("You have to create slot at least 6 hours from now");
    } else {
      setStart(startHour);
      if (end.diff(startHour) < 900000) {
        setEnd(startHour.add(15, "minute"));
      }
    }
  };

  //handle End time change
  const handleEndChange = (newEnd) => {
    const endHour = newEnd
      .date(date.date())
      .month(date.month())
      .year(date.year());
    if (endHour < start.add(15, "minute")) {
      message.error("Slot must be at least 15 minutes");
    } else {
      setEnd(endHour);
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
  const handlePasswordChange = (e) => {
    if (e.target.value.indexOf(" ") === -1) {
      setPassword(e.target.value);
    } else {
      message.error("Password can not contain space");
    }
  };

  //handle type change
  const settingBtn = <Button>Go to Setting</Button>;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => changeToAddLocation("lecturerInformations")}
    >
      Go to Settings
    </Button>
  );
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.warning({
      message: "Can not change type to Online",
      description: "You haven't add any Google Meet link yet",
      btn,
      duration: 5,
    });
  };
  const handleTypeChange = (newType) => {
    if (newType === "online" && (linkMeet === null || linkMeet?.length < 25)) {
      openNotification();
    } else {
      setType(newType);
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
    }`;
    const endString = `${end.$H < 10 ? `0${end.$H}` : end.$H}:${
      end.$m < 10 ? `0${end.$m}` : end.$m
    }`;

    const returnSubjectsList = selectedSubjects.map((subject) => {
      return { subjectCode: subject };
    });
    const newSlot = {
      lecturerId: user.id,
      meetingDay: dateString,
      startTime: startString,
      endTime: endString,
      mode: mode,
      studentEmail: mode === 2 ? studentEmail : null,
      online: type === "online",
      locationId: type === "offline" ? locationId : null,
      slotSubjectDTOS: returnSubjectsList,
      password: !hasPassword ? null : password,
      // toggle: true,
      // status: true,
    };

    if (newSlot.mode === 2 && newSlot.studentEmail === null) {
      message.error("You can not let student email empty in Assign Mode");
    } else {
      //validation empty
      let locErr = false,
        SubjErr = false,
        passErr = false;
      type === "offline" && newSlot.locationId === null && (locErr = true);
      newSlot.slotSubjectDTOS.length === 0 && (SubjErr = true);
      hasPassword &&
        (newSlot.password?.length === 0 || newSlot.password === null) &&
        (passErr = true);
      let tooManySubjErr =
        newSlot.mode === 2 && newSlot.slotSubjectDTOS.length > 1;

      //time validation
      let dateErr = date < today;
      const mustAfterThisTime = today;
      let startErr = start < mustAfterThisTime;
      let endErr = end < start.add(15, "minute");

      if (
        !SubjErr &&
        !locErr &&
        !passErr &&
        !tooManySubjErr &&
        !dateErr &&
        !startErr &&
        !endErr
      ) {
        setIsLoading(true);
        // console.log(JSON.stringify(newSlot));
        axios
          .post(
            "https://meet-production-52c7.up.railway.app/api/v1/slot",
            newSlot
          )
          .then((res) => {
            // console.log(res)
            if (res.data.data === "error") {
              message.error(res.data.message);
            } else {
              message.success("Created successfully");
              getData();
              setCreatedSlotView("");
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
      } else {
        locErr && message.error("Location is required for Offline meeting");
        SubjErr && message.error("You must select at least 1 subject");
        passErr &&
          message.error(
            "You have enabled Passcode, please do not leave it empty"
          );
        tooManySubjErr &&
          message.error("You can only add 1 subject in Assign Student Mode");
        if (dateErr || startErr || endErr) {
          message.error(
            `You have to create slot after ${mustAfterThisTime.date() < 10 ? `0${mustAfterThisTime.date()}` : mustAfterThisTime.date()}/${mustAfterThisTime.month() + 1 < 10 ? `0${mustAfterThisTime.month() + 1}` : mustAfterThisTime.month() + 1}/${mustAfterThisTime.year()} ${mustAfterThisTime.hour() < 10 ? `0${mustAfterThisTime.hour()}` : mustAfterThisTime.hour()}:${mustAfterThisTime.minute() < 10 ? `0${mustAfterThisTime.minute()}` : mustAfterThisTime.minute()}:${mustAfterThisTime.second() < 10 ? `0${mustAfterThisTime.second()}` : mustAfterThisTime.second()}`
          );
        }
      }
    }
  };

  const changeToAddLocation = (toOpt) => {
    const dateString = `${date.date()}/${date.month()}/${date.year()}/${date.hour()}/${date.minute()}/${date.second()}`;
    const startString = `${start.date()}/${start.month()}/${start.year()}/${start.hour()}/${start.minute()}/${start.second()}`;
    const endString = `${end.date()}/${end.month()}/${end.year()}/${end.hour()}/${end.minute()}/${end.second()}`;
    const slotBackupData = {
      date: dateString,
      start: startString,
      end: endString,
      mode: mode,
      selectedSubjects: selectedSubjects,
      locationId: locationId,
      studentEmail: studentEmail,
      password: password,
      hasPassword: hasPassword,
      mode: mode,
    };
    sessionStorage.setItem("locationBack", "backToCreateSlot");
    sessionStorage.setItem("slotBackupData", JSON.stringify(slotBackupData));
    setMenuOpt(toOpt);
  };

  const recoverData = () => {
    const whereToBack = sessionStorage.getItem("locationBack");
    if (whereToBack === "backToCreateSlot") {
      const slotBackupData = JSON.parse(
        sessionStorage.getItem("slotBackupData")
      );
      //parse date
      const splittedDate = slotBackupData.date.split("/");
      const convertedDate = dayjs()
        .date(splittedDate[0])
        .month(splittedDate[1])
        .year(splittedDate[2])
        .hour(splittedDate[3])
        .minute(splittedDate[4])
        .second(splittedDate[5]);
      // parse start
      const splittedStart = slotBackupData.start.split("/");
      const convertedStart = dayjs()
        .date(splittedStart[0])
        .month(splittedStart[1])
        .year(splittedStart[2])
        .hour(splittedStart[3])
        .minute(splittedStart[4])
        .second(splittedStart[5]);
      // // parse end
      const splittedEnd = slotBackupData.end.split("/");
      const convertedEnd = dayjs()
        .date(splittedEnd[0])
        .month(splittedEnd[1])
        .year(splittedEnd[2])
        .hour(splittedEnd[3])
        .minute(splittedEnd[4])
        .second(splittedEnd[5]);

      const backupSlot = {
        date: convertedDate,
        start: convertedStart,
        end: convertedEnd,
        mode: slotBackupData.mode,
        selectedSubjects: slotBackupData.selectedSubjects,
        hasPassword: slotBackupData.hasPassword,
        password: slotBackupData.password,
        locationId: slotBackupData.locationId,
        studentEmail: slotBackupData.studentEmail,
      };
      setDate(convertedDate);
      setStart(convertedStart);
      setEnd(convertedEnd);
      setMode(backupSlot.mode);
      setSelectedSubjects(backupSlot.selectedSubjects);
      setHasPassword(backupSlot.hasPassword);
      setPassword(backupSlot.password);
      setLocationId(backupSlot.locationId);
      setStudentEmail(backupSlot.studentEmail);

      clearBackup();
      message.success("Recovered successfully");
      setHaveBackUp(false);
    }
  };

  const [haveBackup, setHaveBackUp] = useState(false);
  useEffect(() => {
    const whereToBack = sessionStorage.getItem("locationBack");
    whereToBack === "backToCreateSlot" && setHaveBackUp(true);
    getLinkMeet();
  }, []);
  return (
    <>
      {/* Notification */}
      {contextHolder}

      <Row className="requestsInfo">
        <Col xs={1}></Col>

        <Col xs={23}>
          {/* Date */}
          <Row className="animateBox">
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
          <Row className="animateBox">
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
          <Row className="animateBox">
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
          <Row className="animateBox">
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
                  value={mode}
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
            <Row className="animateBox">
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
                    value={studentEmail}
                    style={Object.assign({ width: "320px" })}
                    options={pushEmails(emails)}
                    onChange={(newEmail) => setStudentEmail(newEmail)}
                  />
                </Title>
              </Col>
            </Row>
          )}

          {/* Type */}
          <Row className="animateBox">
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Type:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Title
                className="InfoText id"
                level={5}
                style={{ fontWeight: "400" }}
              >
                <Radio.Group
                  style={Object.assign({ width: "320px" })}
                  value={type}
                  onChange={(newType) => handleTypeChange(newType.target.value)}
                >
                  <Radio.Button value={"offline"}>Offline</Radio.Button>
                  <Radio.Button value={"online"}>Online</Radio.Button>
                </Radio.Group>
              </Title>
            </Col>
          </Row>

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
                {type === "offline" ? (
                  <>
                    <Select
                      style={{ minWidth: "320px" }}
                      value={locationId}
                      className="editInput animateBox"
                      options={pushLocationList(locationsList)}
                      onChange={(newLoc) => handleLocationChange(newLoc)}
                    ></Select>
                    <Popover content="Add new location" placement="right">
                      <Button
                        icon={<PlusOutlined />}
                        style={{ margin: "0 0 0 4px" }}
                        size="small"
                        shape="circle"
                        onClick={() => changeToAddLocation("locations")}
                      ></Button>
                    </Popover>
                  </>
                ) : (
                  <a href={`https://${linkMeet}`} target="_blank">
                    <Tag
                      className="animateBox"
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
              </Title>
            </Col>
          </Row>

          {/* Subject */}

          <Row className="animateBox">
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Subjects:
              </Title>
            </Col>
            <Col xs={15} md={10}>
              <Spin spinning={subjectsLoading} tip="Preparing Subjects...">
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
                    value={selectedSubjects}
                    options={pushSubjectList(subjects)}
                    onChange={(subjectsList) =>
                      handleSubjectChange(subjectsList)
                    }
                  ></Select>
                  {mode === 2 && selectedSubjects.length > 1 && (
                    <>
                      <br />
                      <span
                        style={Object.assign(
                          { fontSize: "11.5px" },
                          { color: "red" },
                          { fontWeight: "450" }
                        )}
                      >
                        You can only add 1 subject in <b>Assign Student</b> Mode
                      </span>
                    </>
                  )}
                </Title>
              </Spin>
            </Col>
          </Row>

          {/* Password */}
          <Row className="animateBox">
            <Col xs={9} md={3}>
              <Title className="InfoText ID" level={5}>
                Passcode{" "}
                <span style={Object.assign({ fontSize: "9px" })}>
                  <Checkbox
                    checked={hasPassword}
                    onChange={() => {
                      setHasPassword(!hasPassword);
                      setPassword("");
                    }}
                  ></Checkbox>
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
                {hasPassword ? (
                  <Input
                    className="editInput animateBox"
                    style={{ width: "320px" }}
                    showCount
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                  ></Input>
                ) : (
                  <i
                    className="animateBox"
                    style={Object.assign(
                      { fontSize: "11px" },
                      { color: "gray" }
                    )}
                  >
                    Tick the checkbox to enable Passcode
                  </i>
                )}
              </Title>
            </Col>
          </Row>

          {/* Buttons */}
          <Row className="animateBox">
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}></Title>
            </Col>
            <Col xs={15} md={10}>
              {/* Create */}
              <Button
                disabled={subjectsLoading || isLoading}
                type="primary"
                style={{ margin: "12px 8px 0 0" }}
                icon={<FormOutlined />}
                onClick={handleSubmit}
              >
                Create
              </Button>

              {haveBackup && (
                <Popover content="You have a draft slot, click to Recover">
                  <Button icon={<RedoOutlined />} onClick={recoverData}>
                    Recover
                  </Button>
                </Popover>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
