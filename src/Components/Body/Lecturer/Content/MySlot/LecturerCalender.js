import { Calendar } from "antd";
import {ConvertDate, GetWeek} from "../../../../../ExtendedFunction/Date.js";

export const LecturerCalender = (props) => {
  //receive function
  const selectedDate = props.selectedDate,
  setSelectedDate = props.setSelectedDate,
  setSelectedWeek = props.setSelectedWeek;

  //function run when change year/month
  const onPanelChange = (value, mode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
  };

  //function run when change date
  const onDateChange = (newDate) => {
    //set selected date
    let date = newDate.$D,
      month = newDate.$M + 1,
      year = newDate.$y,
      returnDate = ConvertDate(date, month, year);
    setSelectedDate(returnDate);
    setSelectedWeek(GetWeek(returnDate));
  };
  return (
    <>
      {/* Calender */}
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
      />
    </>
  );
};
