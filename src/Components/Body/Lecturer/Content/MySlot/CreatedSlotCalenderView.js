import { Empty, Button, Modal } from "antd";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightFilled,
  CalendarFilled,
} from "@ant-design/icons";
import {
  getNextWeek,
  getPrevWeek,
} from "../../../../../ExtendedFunction/Date.js";
import { LecturerCalender } from "./LecturerCalender";

export const LectuerCalenderView = (props) => {
  //modal state
  const [open, setOpen] = useState(false);

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

  return (
    <div className="CalenderViewContainer">
      {/* Support Buttons */}
      <div className="CalenderViewSupportBtn">
        {/* back to previous week */}
        <Button icon={<CaretLeftFilled />} onClick={onClickPrevWeek}></Button>
        {/* foward to next week */}
        <Button icon={<CaretRightFilled />} onClick={onClickNextWeek}></Button>
        {/* Calender button */}
        <Button icon={<CalendarFilled />} onClick={() => setOpen(true)}></Button>
      </div>  

      {/* Popup Calender */}
      <Modal title="Calender" open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        <LecturerCalender selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedWeek={setSelectedWeek}/>
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
            </ul>
          ) : (
            // others
            <ul key={i}>
              <li>{weekDate.day}</li>
              <li>{weekDate.date}</li>
            </ul>
          );
        })}
      </div>

      {/* No Slot display */}
      <Empty description="No slot found" />
    </div>
  );
};
