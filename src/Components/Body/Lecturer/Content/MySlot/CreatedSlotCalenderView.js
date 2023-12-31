import {
  Empty,
  Button,
  Modal,
  message,
  Popover,
  Row,
  Col,
  Tag,
  Popconfirm,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import {
  CaretLeftFilled,
  CaretRightFilled,
  CalendarFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { LecturerCalender } from "./LecturerCalender";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useDate } from "../../../../../Hooks/All/useDate.js";
import { useSlotLecturer } from "../../../../../Hooks/Lecturer/useSlotLecturer";
import dayjs from "dayjs";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export const LectuerCalenderView = (props) => {
  //receive function
  const selectedDate = props.selectedDate,
    setSelectedDate = props.setSelectedDate,
    selectedWeek = props.selectedWeek,
    setSelectedWeek = props.setSelectedWeek,
    setCreatedSlotView = props.setCreatedSlotView,
    setEditingSlot = props.setEditingSlot,
    slots = props.slots,
    getData = props.getData;

  const day = new dayjs();
  const todayString = `${day.$D < 10 ? `0${day.$D}` : day.$D}/${
    day.$M + 1 < 10 ? `0${day.$M + 1}` : day.$M + 1
  }/${day.$y}`;

  const { LecturerEditSlotFunction, LecturerDeleteSlotFunction } =
    useSlotLecturer();

  //modal state
  const [open, setOpen] = useState(false);

  const ArrayToString = useArray();
  const { getNextWeek, getPrevWeek, GetWeek } = useDate();

  //handle onClick next week
  const onClickNextWeek = () => {
    const nextWeek = getNextWeek(selectedDate);
    setSelectedWeek(nextWeek);
    setSelectedDate(nextWeek[0].date);
  };

  //handle onClick prev week
  const onClickPrevWeek = () => {
    const prevWeek = getPrevWeek(selectedDate);
    setSelectedWeek(prevWeek);
    setSelectedDate(prevWeek[0].date);
  };

  const [onChoosingDate, setOnChoosingDate] = useState();
  //open calender modal
  const handleOpenCalendar = () => {
    //save user choosing date
    //each time user choose a day, it initializes to the onChoosingDate state
    const spliDate = selectedDate.split("/");
    //-1 because display month start from 1 (ex: displayMonth[1] = Jan), change to system month (ex: sysMonth[0] = Jan)
    const mergeDate = `${spliDate[0]}/0${spliDate[1] - 1}/${spliDate[2]}`;
    setOnChoosingDate(mergeDate);
    setOpen(true);
  };

  //User click OK on Calender popup Modal
  const handleCalenderOk = () => {
    const spliDateOK = onChoosingDate.split("/");
    //add 0 before month if month < 10
    //+1 because in month array, month[0] = January
    const checkMonth =
      parseInt(spliDateOK[1]) + 1 < 10
        ? `0${parseInt(spliDateOK[1]) + 1}`
        : `${parseInt(spliDateOK[1]) + 1}`;
    const mergeDateOK = `${spliDateOK[0]}/${checkMonth}/${spliDateOK[2]}`;
    //done choosing -> set public state
    setSelectedDate(mergeDateOK);
    setSelectedWeek(GetWeek(mergeDateOK));
    setOpen(false);
    message.success(`Updated week view to ${mergeDateOK}`);
  };

  //* Antispam handler
  //count click
  const [clickEdit, setClickEdit] = useState(0);
  const [clickDelete, setClickDelete] = useState(0);

  //cooldown 3s if user click over 2 times
  setTimeout(() => {
    clickEdit > 0 && setClickEdit(clickEdit - 1);
    clickDelete > 0 && setClickDelete(clickDelete - 1);
  }, 3000);

  //check spam for edit
  const handleClickEdit = (slot) => {
    clickEdit === 2 && message.error("Please try again after 3 seconds");
    clickEdit < 3 && setClickEdit(clickEdit + 1);
    if (clickEdit < 2) {
      LecturerEditSlotFunction(
        slot,
        setCreatedSlotView,
        setEditingSlot,
        getData
      );
    }
  };

  //check spam for delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleClickDelete = (slot) => {
    clickDelete === 2 && message.error(`Please try again after 3 seconds`);
    clickDelete < 3 && setClickDelete(clickDelete + 1);
    if (clickDelete < 2) {
      LecturerDeleteSlotFunction(slot, setDeleteLoading, getData);
    }
  };

  //conver mode
  const convertMode = (mode) => {
    switch (mode) {
      case 0:
        return "Manual Approve";
      case 1:
        return "Accept the first booker";
      case 2:
        return "Assign Student";
    }
  };

  //convert status
  const convertStatus = (status) => {
    switch (status) {
      case true:
        return <Tag color="green">Available</Tag>;
      case false:
        return <Tag color="red">Not Available</Tag>;
    }
  };

  return (
    <div className="CalenderViewContainer">
      {/* Support Buttons */}
      <div className="CalenderViewSupportBtn">
        {/* back to previous week */}
        <Button icon={<CaretLeftFilled />} onClick={onClickPrevWeek}></Button>
        {/* foward to next week */}
        <Button icon={<CaretRightFilled />} onClick={onClickNextWeek}></Button>
        {/* Calender button */}
        <Button icon={<CalendarFilled />} onClick={handleOpenCalendar}></Button>
      </div>

      <Spin spinning={deleteLoading}>
        {/*/ POPUP */}
        {/* Popup Calender */}
        <Modal
          title="Calender"
          open={open}
          onOk={handleCalenderOk}
          onCancel={() => setOpen(false)}
        >
          <LecturerCalender
            onChoosingDate={onChoosingDate}
            setOnChoosingDate={setOnChoosingDate}
          />
        </Modal>

        {/* Display week & slot */}
        <div className="lecturerCreatedSlots">
          {/* Display dates & days */}
          {/* LecturerSelectedDates */}
          {selectedWeek.map((weekDate, i) => {
            return (
              <ul key={i}>
                <li>{weekDate.day}</li>
                <li
                  className={
                    weekDate.date === todayString ? "LecturerSelectedDates" : ""
                  }
                >
                  {weekDate.date}
                </li>

                {/* display created slot */}
                {slots?.map((slot, key) => {
                  return (
                    weekDate.date === slot.meetingDay && (
                      // PopOver -> Appear when user hover
                      <Popover
                        key={key}
                        // Header of PopOver
                        title={
                          <>
                            <div className="hoverSlotInfo">
                              <>SLOT INFO {convertStatus(slot.status)}</>
                              <div>
                                {/* Edit Button */}
                                <EditOutlined
                                  onClick={() => handleClickEdit(slot)}
                                />
                                {/* Delete Button */}
                                <Popconfirm
                                  placement="left"
                                  title="Are you sure want to delete this slot?"
                                  onConfirm={() => handleClickDelete(slot)}
                                >
                                  <DeleteOutlined
                                    style={Object.assign(
                                      { color: "red" },
                                      { margin: "0 0 0 14px" }
                                    )}
                                  />
                                </Popconfirm>
                              </div>
                            </div>
                          </>
                        }
                        // Body of PopOver
                        content={
                          <span
                            style={Object.assign(
                              { lineHeight: "30px" },
                              { minWidth: "300px" }
                            )}
                          >
                            {/* <Row style={{ width: "300px" }}>
                              <Col xs={7}>
                                <b>ID:</b>
                              </Col>
                              <Col xs={17}>{slot.id}</Col>
                            </Row> */}
                            <Row style={{ width: "300px" }}>
                              <Col xs={7}>
                                <b>Date:</b>
                              </Col>
                              <Col xs={17}> {slot.meetingDay} </Col>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Time:</b>
                              </Col>
                              <Col xs={17}>
                                {slot.startTime.slice(0, 5)} -{" "}
                                {slot.endTime.slice(0, 5)}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Mode:</b>
                              </Col>
                              <Col xs={17}>{convertMode(slot.mode)}</Col>
                            </Row>

                            {/* Location */}
                            <Row>
                              <Col xs={7}>
                                <b>Location:</b>
                              </Col>
                              <Col xs={17}>
                                {" "}
                                {slot.online ? (
                                  <a
                                    href={`https://${slot.linkMeet}`}
                                    target="_blank"
                                  >
                                    <Tag
                                      style={Object.assign(
                                        { display: "flex" },
                                        { alignItems: "center" },
                                        { width: "106px" },
                                        { margin: "5px 0 0 0" },
                                        { justifyContent: "space-between" },
                                        { cursor: "pointer" }
                                      )}
                                      icon={<GooglemeetLogo />}
                                      color="geekblue"
                                    >
                                      Google Meet
                                    </Tag>
                                  </a>
                                ) : (
                                  <Popover content={slot.locationAddress}>
                                    <Tag color="orange">
                                      {slot.locationName}
                                    </Tag>
                                  </Popover>
                                )}
                              </Col>
                            </Row>

                            <Row>
                              <Col xs={7}>
                                <b>Subject:</b>
                              </Col>
                              <Col xs={17}>
                                {slot.studentName !== null
                                  ? slot.subject
                                  : ArrayToString(
                                      slot.slotSubjectDTOS.map((subj) => {
                                        return subj.subjectCode;
                                      })
                                    )}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Password:</b>{" "}
                              </Col>{" "}
                              <Col xs={17}>{slot.password}</Col>
                            </Row>
                            <Row>
                              <span>------------</span>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Student:</b>
                              </Col>
                              <Col xs={17}>
                                {slot.studentName === null
                                  ? "None"
                                  : slot.studentName}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Email:</b>
                              </Col>
                              <Col xs={17}>
                                {slot.studentName === null
                                  ? "None"
                                  : slot.studentEmail}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={7}>
                                <b>Phone:</b>
                              </Col>
                              <Col xs={17}>
                                {slot.studentName === null
                                  ? "None"
                                  : slot.studentPhone === null
                                  ? "No phone number"
                                  : slot.studentPhone}
                              </Col>
                            </Row>
                          </span>
                        }
                      >
                        {/* Slot box appear in Week Calender */}
                        <li
                          className={`slotDisplay ${
                            slot.status && "slotDisplayAvaiable"
                          }`}
                          key={key}
                        >
                          {slot.startTime.slice(0, 5)} -{" "}
                          {slot.endTime.slice(0, 5)}
                        </li>
                      </Popover>
                    )
                  );
                })}
              </ul>
            );
          })}
        </div>
      </Spin>
      {/* No Slot display */}
      {slots?.length === 0 && <Empty description="No slot found" />}
    </div>
  );
};
