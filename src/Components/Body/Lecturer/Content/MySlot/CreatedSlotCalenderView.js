import { Empty, Button, Modal, message } from "antd";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightFilled,
  CalendarFilled,
} from "@ant-design/icons";
import {
  getNextWeek,
  getPrevWeek,
  GetWeek,
} from "../../../../../ExtendedFunction/Date.js";
import { LecturerCalender } from "./LecturerCalender";

export const LectuerCalenderView = (props) => {
  //modal state
  const [open, setOpen] = useState(false);

  //API
  const [SlotList, setSlotList] = useState([]);
  //! Fetching API slot from date to date of user here

  //receive function
  const selectedDate = props.selectedDate,
    setSelectedDate = props.setSelectedDate,
    selectedWeek = props.selectedWeek,
    setSelectedWeek = props.setSelectedWeek;

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

  //test data
  const slotList = [
    {
      id: 1,
      date: "30/09/2023",
      startTime: "10:00",
      endTime: "11:00",
      location: "FPT",
      student: null,
      subject: "SWP391",
      password: null,
    },
    {
      id: 2,
      date: "27/09/2023",
      startTime: "14:00",
      endTime: "16:30",
      location: "FPT",
      student: "Tran Cong Lam (K17 HCM)",
      subject: "SWP391, SWT301",
      password: "12345",
    },
  ];

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

      <div className="lecturerCreatedSlots">
        {/* Display dates & days */}
        {/* LecturerSelectedDates */}
        {selectedWeek.map((weekDate, i) => {
          return selectedDate === weekDate.date ? (
            // add class for selected date
            <ul key={i}>
              <li>{weekDate.day}</li>
              <li className="LecturerSelectedDates">{weekDate.date}</li>
              {/* display created slot */}
              {slotList.map((slot, key) => {
                return (
                  slot.date === weekDate.date && (
                    <li className="slotDisplay" key={key}>
                      {slot.startTime} - {slot.endTime}
                    </li>
                  )
                );
              })}
            </ul>
          ) : (
            // others
            <ul key={i}>
              <li>{weekDate.day}</li>
              <li>{weekDate.date}</li>

              {/* display created slot */}
              {slotList.map((slot, key) => {
                return (
                  slot.date === weekDate.date && (
                    <li
                      onClick={() => console.log(slot)}
                      className="slotDisplay"
                      key={key}
                    >
                      {slot.startTime} - {slot.endTime}
                    </li>
                  )
                );
              })}
            </ul>
          );
        })}
      </div>

      {/* No Slot display */}
      {slotList.length === 0 && <Empty description="No slot found" />}
    </div>
  );
};
