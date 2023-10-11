import { Calendar } from "antd";
import { useDate } from "../../../../../Hooks/All/useDate.js";
import React from "react";
import dayjs from "dayjs";

export const LecturerCalender = (props) => {
  //receive function
  const onChoosingDate = props.onChoosingDate,
  setOnChoosingDate = props.setOnChoosingDate;

  const { ConvertDate, parseDate } = useDate();

  //function run when change year/month
  const onPanelChange = (value, mode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
  };

  //function run when change date
  const onDateChange = (newDate) => {
    //set selected date
    let date = newDate.$D,
      month = newDate.$M,
      year = newDate.$y,
      returnDate = ConvertDate(date, month, year);

      //each time user choose a day, it initializes to the onChoosingDate
      setOnChoosingDate(returnDate);
  };

  //parse date to dayjs format
  const toDayDate = new dayjs(parseDate(onChoosingDate));

  return (
    <>
      {/* Calender */}
      <Calendar
        value={toDayDate}
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
      />
    </>
  );
};
