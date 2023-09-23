import "../Lecturer.css";
import { useContext, useState } from "react";
import { Data } from "../../Body";
import { LecturerMenu } from "./LecturerMenu";
import { LecturerCreateSlotBtn } from "./LecturerCreateSlotBtn";
import { Calendar, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { ConvertDate, GetWeek } from "../../../../ExtendedFunction/Date";

export const LecturerSider = () => {
  // Set menu state
  const [menuState, setMenuState] = useState(true);

  //get function set selected date
  const { setSelectedDate, setSelectedWeek} = useContext(Data);

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
    setSelectedWeek(GetWeek(returnDate))
  };

  return (
    <div className="Sider">
      {/* Button */}
      <div className="DisplayBtn">
        {/* Create slot */}
        <LecturerCreateSlotBtn />

        {/* show/unshow menu */}
        <Button
          className="LecturerShowBtn"
          icon={menuState? <CloseOutlined /> : <MenuOutlined />}
          onClick={() => setMenuState(!menuState)}
        ></Button>
      </div>

      {/* Menu */}
      {menuState && (
        <>
          {/* Calender */}
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            onSelect={onDateChange}
          />

          {/* Menu */}
          <LecturerMenu />
        </>
      )}
    </div>
  );
};
