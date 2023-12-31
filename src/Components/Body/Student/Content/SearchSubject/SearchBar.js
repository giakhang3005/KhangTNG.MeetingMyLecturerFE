import { React, useState, useEffect } from "react";
import { Select, Row, Col, Button, Modal, message, Popover, Spin } from "antd";
import {
  SearchOutlined,
  CalendarFilled,
  CarryOutFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { PickDate } from "./PickDate";

export function SearchBar(props) {
  //get function
  const setIsSearchingSubject = props.setIsSearchingSubject,
    setLecturerCodeSearch = props.setLecturerCodeSearch,
    lecturerCodeSearch = props.lecturerCodeSearch,
    startDate = props.startDate,
    setStartDate = props.setStartDate,
    toDate = props.toDate,
    setToDate = props.setToDate,
    setRecentSearch = props.setRecentSearch,
    isSearchingSubject = props.isSearchingSubject,
    setBookingList = props.setBookingList,
    setLoading = props.setLoading,
    setCheckSearch = props.setCheckSearch;

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
      setSubjectsLoading(true);
    }

    axios
      .get("https://meet-production-52c7.up.railway.app/api/subject/status")
      .then(
        (response) => (
          setSubjects(response.data),
          localStorage.setItem("subjects", JSON.stringify(response.data))
        )
      )
      .finally(() => setSubjectsLoading(false));
  };

  //! lecturerCodes from API
  const [lecturerCodes, setLecturerCodes] = useState([]);
  const [lecturerCodesLoading, setLecturerCodesLoading] = useState(false);
  const getLecturerCodes = () => {
    if (
      localStorage.getItem("lecturerCodes") !== null &&
      localStorage.getItem("lecturerCodes") !== "undefined"
    ) {
      setLecturerCodes(JSON.parse(localStorage.getItem("lecturerCodes")));
    } else {
      setLecturerCodesLoading(true);
    }

    axios
      .get(
        "https://meet-production-52c7.up.railway.app/api/lecturer/lecturerCode"
      )
      .then(
        (response) => (
          setLecturerCodes(response.data),
          localStorage.setItem("lecturerCodes", JSON.stringify(response.data))
        )
      )
      .finally(() => setLecturerCodesLoading(false));
  };

  useEffect(() => {
    getSubjects();
    getLecturerCodes();
    // handleSearch();
  }, []);

  const [fromDatePicker, setFromDatePicker] = useState(null);
  const [toDatePicker, setToDatePicker] = useState(null);

  //Modal handler
  const today = new dayjs().hour(0).minute(0).second(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setFromDatePicker(startDate);
    setToDatePicker(toDate);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (fromDatePicker === null && toDatePicker !== null) {
      setStartDate(new dayjs());
      setToDate(toDatePicker);
    } else {
      setStartDate(fromDatePicker);
      setToDate(toDatePicker);
    }

    message.success("Saved Advanced option (Date)");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClearDate = () => {
    //public date state
    setStartDate(null);
    setToDate(null);

    message.success("Cleared Advanced option (Date)");
    setIsModalOpen(false);
  };

  //Handle search
  const handleSearch = () => {
    setCheckSearch(true)
    //! handle show recent
    //fetch subject, startDate, toDate
    const startDateString =
      startDate !== null
        ? `${startDate.$D}/${startDate.$M + 1}/${startDate.$y}`
        : null;

    const toDateString =
      toDate !== null ? `${toDate.$D}/${toDate.$M + 1}/${toDate.$y}` : null;

    const recentSearchValue = {
      subject: isSearchingSubject,
      lecturerCode: lecturerCodeSearch,
      start: startDateString,
      to: toDateString,
    };
    // console.log(recentSearchValue);
    setRecentSearch(recentSearchValue);

    //! handle search
    const startSearch =
      startDate !== null
        ? `${startDate.$y}-${
            startDate.$M + 1 < 10 ? `0${startDate.$M + 1}` : startDate.$M + 1
          }-${startDate.$D < 10 ? `0${startDate.$D}` : startDate.$D}`
        : null;

    const toSearch =
      toDate !== null
        ? `${toDate.$y}-${
            toDate.$M + 1 < 10 ? `0${toDate.$M + 1}` : toDate.$M + 1
          }-${toDate.$D < 10 ? `0${toDate.$D}` : toDate.$D}`
        : null;

    const searchValue = {
      subject: isSearchingSubject,
      lecturerCode: lecturerCodeSearch,
      start: startSearch,
      to: toSearch,
    };

    let queryString =
      "https://meet-production-52c7.up.railway.app/api/v1/slot/student?";
    //subject
    queryString +=
      searchValue.subject !== null ? `subjectCode=${searchValue.subject}&` : "";
    //lecturer
    queryString +=
      searchValue.lecturerCode !== null ? `lecturerCode=${searchValue.lecturerCode}&` : "";
    //start
    queryString +=
      searchValue.start !== null ? `startDay=${searchValue.start}&` : "";
    //end
    queryString += searchValue.to !== null ? `endDay=${searchValue.to}` : "";

    // console.log(queryString);
    //!Fetching
    setLoading(true);
    axios
      .get(queryString)
      .then((res) => setBookingList(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Advanced Option"
        okText="Save"
      >
        <PickDate
          fromDatePicker={fromDatePicker}
          setFromDatePicker={setFromDatePicker}
          toDatePicker={toDatePicker}
          setToDatePicker={setToDatePicker}
          handleClearDate={handleClearDate}
        />
      </Modal>

      <Row>
        {/* <Col xs={2} md={6}></Col> */}
        <Col xs={10} md={6}>
          {/* Search box */}
          <Spin
            spinning={lecturerCodesLoading}
            size="medium"
            tip="Preparing Lecturers..."
          >
            <Select
              suffixIcon={<SearchOutlined />}
              placeholder="Search Lecturer (PhuongLHK,...)"
              showSearch
              allowClear
              onClear={() => setLecturerCodeSearch(null)}
              onSelect={(subject) => setLecturerCodeSearch(subject)}
              options={lecturerCodes.map((lecturerCode) => ({
                value: lecturerCode,
                label: lecturerCode,
              }))}
              style={{
                width: "98%",
              }}
            ></Select>
          </Spin>
        </Col>
        <Col xs={10} md={5}>
          {/* Search box */}
          <Spin
            spinning={subjectsLoading}
            size="medium"
            tip="Preparing Subjects..."
          >
            <Select
              suffixIcon={<SearchOutlined />}
              placeholder="Search Subjects (SWP391,...)"
              showSearch
              allowClear
              onClear={() => setIsSearchingSubject(null)}
              onSelect={(subject) => setIsSearchingSubject(subject)}
              options={subjects.map((subject) => ({
                value: subject.code,
                label: subject.code,
              }))}
              style={{
                width: "100%",
              }}
            ></Select>
          </Spin>
        </Col>
        {/* Advance option */}
        <Col xs={2} md={1}>
          <Popover
            content={
              startDate === null
                ? "Click to create a Date option"
                : "Click to edit a Date option"
            }
          >
            <Button
              style={{ margin: "0 0 0 4px" }}
              icon={
                startDate === null || toDate === null ? (
                  <CalendarFilled />
                ) : (
                  <CarryOutFilled style={{ color: "green" }} />
                )
              }
              onClick={showModal}
            ></Button>
          </Popover>
        </Col>
        <Col xs={2} style={{ margin: "0 0 0 0" }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          ></Button>
        </Col>
      </Row>
    </>
  );
}
