import { useContext } from "react";
import { Data } from "../../../Body";
import { LecturerCreateSlotBtn } from "./LecturerCreateSlotBtn";
import { LectuerCalenderView } from "./CreatedSlotCalenderView";
import { CreatedSlotTableView } from "./CreatedSlotTableView";
import "../../Lecturer.css";
import { Typography, Tabs } from "antd";

export const LecturerCreatedSlot = () => {
  // Get state
  const { selectedDate, setSelectedDate, selectedWeek, setSelectedWeek } = useContext(Data);
  const { Title, Text } = Typography;

  //Tab of Views
  const tabsObj = [
    {
      label: "Calender View",
      key: "calenderView",
      children: (
        <LectuerCalenderView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      ),
    },
    {
      label: "Table View",
      key: "tableView",
      children: <CreatedSlotTableView />,
    },
  ];

  return (
    <div>
      {/* Title */}
      <Title className="sectionTitle" level={3}>
        MY SLOTS <LecturerCreateSlotBtn />
      </Title>

      {/* Tabs */}
      <div className="createdSlotTabs">
        <Tabs defaultActiveKey="1" items={tabsObj} />
      </div>
    </div>
  );
};
