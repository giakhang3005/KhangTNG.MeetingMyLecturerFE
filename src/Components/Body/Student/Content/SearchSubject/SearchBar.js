import { React, useState } from "react";
import { Select, Row, Col, Button, Modal, message, Popover } from "antd";
import {
  SearchOutlined,
  CalendarFilled,
  CarryOutFilled,
} from "@ant-design/icons";
import { Data } from "../../../Body";
import dayjs from "dayjs";

import { PickDate } from "./PickDate";

export function SearchBar(props) {
  //get function
  const setIsSearchingSubject = props.setIsSearchingSubject,
    startDate = props.startDate,
    setStartDate = props.setStartDate,
    toDate = props.toDate,
    setToDate = props.setToDate;

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
  const handleSearch = (subject) => {
    setIsSearchingSubject(subject);
    //fetch subject, startDate, toDate
  };
  //! subjectsget from API
  const subjects = ["SWP391", "SWT301", "SWR302"];
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
          <Select
            suffixIcon={<SearchOutlined />}
            placeholder="Ex: SWP391,..."
            showSearch
            allowClear
            onSelect={(value) => handleSearch(value)}
            options={subjects.map((subject) => ({
              value: subject,
              label: subject,
            }))}
            style={{
              width: "100%",
            }}
          ></Select>
        </Col>
        <Col xs={4} md={3}>
          <Popover content={startDate === null ? "Click to create a Date option" : "Click to edit a Date option"}>
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
        {/* <Col xs={3} md={15}></Col> */}
      </Row>
    </>
  );
}
