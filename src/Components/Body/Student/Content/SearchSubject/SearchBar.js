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
    startDate = props.startDate,
    setStartDate = props.setStartDate,
    toDate = props.toDate,
    setToDate = props.setToDate,
    setRecentSearch = props.setRecentSearch,
    isSearchingSubject = props.isSearchingSubject;

    //Handle Subject
  //! subject from API
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  useEffect(() => {
    setSubjectsLoading(true)
    axios
      .get("https://meet-production-52c7.up.railway.app/api/subject/status")
      .then((response) => setSubjects(response.data))
      .finally(() => setSubjectsLoading(false))
  }, [])

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
    if (startDate === null) {
      setStartDate(today);
      setToDate(today);
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
    //fetch subject, startDate, toDate
    const startDateString =
      startDate !== null
        ? `${startDate.$D}/${startDate.$M + 1}/${startDate.$y}`
        : null;

    const toDateString =
      toDate !== null ? `${toDate.$D}/${toDate.$M + 1}/${toDate.$y}` : null;

      const searchValue = {
        subject: isSearchingSubject,
        start: startDateString,
        to: toDateString,
      }
      setRecentSearch(searchValue)
      //!Call API search here
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
        <Col xs={17} md={9}>
          {/* Search box */}
          <Spin
            spinning={subjectsLoading}
            size="medium"
            tip="Preparing Subjects..."
          >
            <Select
              suffixIcon={<SearchOutlined />}
              placeholder="Ex: SWP391,..."
              showSearch
              allowClear
              onSelect={(subject) =>  setIsSearchingSubject(subject)}
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
                startDate === null ? (
                  <CalendarFilled />
                ) : (
                  <CarryOutFilled style={{ color: "green" }} />
                )
              }
              onClick={showModal}
            ></Button>
          </Popover>
        </Col>
        <Col xs={2} style={{margin: '0 0 0 8px'}}><Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}></Button></Col>
      </Row>
    </>
  );
}
