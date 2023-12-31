import { React, useState, useContext, useEffect } from "react";
import {
  Input,
  Button,
  message,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Select,
  Spin,
  Typography,
  notification,
  Radio,
  Tag,
  Checkbox,
} from "antd";
import { LeftOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Data } from "../../../Body";
import axios from "axios";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export const EditingSlot = ({ editingSlot, setCreatedSlotView, getData }) => {
  const { user, setMenuOpt } = useContext(Data);
  //Handle Subject
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

  //!Locations
  const [locationsList, setLocationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getLocations = () => {
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/location/personal?Lecturer-id=${user.id}`
      )
      .then((response) => setLocationsList(response.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSubjects();
    getLocations();
  }, []);

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

  const { Option } = Select;
  const { Title } = Typography;

  //Time format
  const [today, setToday] = useState(new dayjs());
  const dateSplit = editingSlot.meetingDay.split("/");
  const slotDate = new dayjs()
    .set("date", dateSplit[0])
    .set("month", dateSplit[1] - 1)
    .set("year", dateSplit[2]);
  const timeFormat = "HH:mm";
  const startTimeDayjs = new dayjs(editingSlot.startTime, timeFormat)
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2]);
  const endTimeDayjs = new dayjs(editingSlot.endTime, timeFormat)
    .date(dateSplit[0])
    .month(dateSplit[1] - 1)
    .year(dateSplit[2]);

  //! state
  const [date, setDate] = useState(slotDate);
  const [start, setStart] = useState(startTimeDayjs);
  const [end, setEnd] = useState(endTimeDayjs);
  const [type, setType] = useState(editingSlot.online ? "online" : "offline");
  const [locationId, setLocationId] = useState(
    editingSlot.locationId === 0 ? null : editingSlot.locationId
  );
  const [hasPassword, setHasPassword] = useState(editingSlot.password !== null);
  const [password, setPassword] = useState(editingSlot.password);
  const [selectedSubjects, setSelectedSubjects] = useState(
    editingSlot.slotSubjectDTOS.map((subj) => subj.subjectCode)
  );

  //handle Date Change
  const handleDateChange = (newDate) => {
    if (newDate < today) {
      message.error("You can not set slot with past date");
    } else {
      setDate(newDate);
      //set new date/month/year for start time & end time
      setStart(
        newDate.date(newDate.date()).month(newDate.month()).year(newDate.year())
      );
      setEnd(
        newDate
          .date(newDate.date())
          .month(newDate.month())
          .year(newDate.year())
          .hour(end.hour())
          .minute(end.minute())
      );
    }
  };

  //handle State time change
  const handleStartChange = (newStart) => {
    if (newStart < today.add(6, "hour")) {
      message.error("Your changed time must be 6 hours from now");
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

  //handle subject change
  const handleSubjectChange = (newSubjectList) => {
    setSelectedSubjects(newSubjectList);
  };

  //handle change Type
  const [api, contextHolder] = notification.useNotification();
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => setMenuOpt("lecturerInformations")}
    >
      Go to Settings
    </Button>
  );
  const openNotification = () => {
    api.warning({
      message: "Can not change type to Online",
      description: "You haven't add any Google Meet link yet",
      btn,
      duration: 5,
    });
  };
  const handleTypeChange = (newType) => {
    if (
      newType === "online" &&
      (editingSlot.linkMeet === null || editingSlot.linkMeet?.length < 25)
    ) {
      openNotification();
    } else {
      setType(newType);
    }
  };

  //handle submit update
  const [updateLoading, setUpdateLoading] = useState(false);
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

    //convert subject to correct syntax
    const returnSubjectsList = selectedSubjects.map((subject) => {
      return { subjectCode: subject };
    });

    const newSlot = {
      id: editingSlot.id,
      meetingDay: dateString,
      startTime: startString,
      endTime: endString,
      online: type === "online",
      locationId: type === "offline" ? locationId : null,
      // slotSubjectDTOS: returnSubjectsList,
      password: password,
      lecturerId: user.id,
    };

    const locErr = type === "offline" && newSlot.locationId === null;
    // const SubjErr = newSlot.slotSubjectDTOS?.length === 0;

    if (!locErr) {
      setUpdateLoading(true);
      axios
        .put(
          `https://meet-production-52c7.up.railway.app/api/v1/slot/put/${newSlot.id}`,
          newSlot
        )
        .then((res) => {
          message.success("Updated slot successfully");
          getData();
          // console.log(res);
        })
        .catch((err) => (message.error("Updated fail"), console.error(err)))
        .finally(() => setUpdateLoading(false));
    } else {
      locErr && message.error("Location is required for Offline meeting");
      // SubjErr && message.error("You must select at least 1 subject");
    }
  };

  return (
    <>
      {contextHolder}
      <Title className="sectionTitle" level={3}>
        EDITING SLOT
        {/* Back button */}
      </Title>
      <Button
        disabled={updateLoading}
        icon={<LeftOutlined />}
        type="text"
        onClick={() => setCreatedSlotView("")}
      >
        Back
      </Button>
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
                  disabled
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
                  disabled
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
                  disabled
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
                  defaultValue={editingSlot.mode}
                  disabled
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
                {type === "online" ? (
                  <a href={`https://${editingSlot.linkMeet}`} target="_blank">
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
                ) : (
                  <Select
                    style={{ minWidth: "320px" }}
                    className="editInput"
                    value={locationId}
                    options={pushLocationList(locationsList)}
                    onChange={(newLoc) => handleLocationChange(newLoc)}
                  ></Select>
                )}
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
              <Spin spinning={subjectsLoading} tip="Preparing Subjects...">
                <Title
                  className="InfoText"
                  level={5}
                  style={{ fontWeight: "400" }}
                >
                  <Select
                  disabled
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
                </Title>
              </Spin>
            </Col>
          </Row>

          {/* Password */}
          <Row>
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
          <Row>
            <Col xs={9} md={3}>
              <Title className="InfoText" level={5}></Title>
            </Col>
            <Col xs={15} md={10}>
              {/* Create */}
              <Button
                // disabled={subjectsLoading || isLoading}
                type="primary"
                style={{ margin: "12px 8px 0 0" }}
                icon={<FormOutlined />}
                onClick={handleSubmit}
                loading={updateLoading}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
