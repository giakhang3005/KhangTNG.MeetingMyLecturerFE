import { useContext, useState, useEffect } from "react";
import { Data } from "../../../Body";
import { LecturerCreateSlotBtn } from "./LecturerCreateSlotBtn";
import { LectuerCalenderView } from "./CreatedSlotCalenderView";
import { CreatedSlotTableView } from "./CreatedSlotTableView";
import "../../Lecturer.css";
import { EditingSlot } from "./EditingSlot";
import { CreatingSlot } from "./CreatingSlot";
import { Typography, Tabs, Spin, Button } from "antd";
import {RedoOutlined} from '@ant-design/icons'
import axios from "axios";

export const LecturerCreatedSlot = () => {
  // Get state
  const { selectedDate, setSelectedDate, selectedWeek, setSelectedWeek, user } =
    useContext(Data);
  const { Title, Text } = Typography;

  //Slot view
  const [createdSlotView, setCreatedSlotView] = useState(" ");

  //slot is being edit
  const [editingSlot, setEditingSlot] = useState([]);

  //!Fetching
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/slot/lecturer?id=${user.id}`
      )
      .then((response) => setSlots(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

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
          setCreatedSlotView={setCreatedSlotView}
          setEditingSlot={setEditingSlot}
          slots={slots}
        />
      ),
    },
    {
      label: "Table View",
      key: "tableView",
      children: (
        <CreatedSlotTableView
          setCreatedSlotView={setCreatedSlotView}
          setEditingSlot={setEditingSlot}
          slots={slots}
        />
      ),
    },
  ];

  return (
    <div>
      {/* <CreatingSlot setCreatedSlotView={setCreatedSlotView} /> */}
      {/* Edit view */}
      {createdSlotView === "create" ? (
        <CreatingSlot setCreatedSlotView={setCreatedSlotView} />
      ) : createdSlotView === "edit" ? (
        <EditingSlot
          editingSlot={editingSlot}
          setCreatedSlotView={setCreatedSlotView}
        />
      ) : (
        // Default view
        <>
          {/* Title */}
          <Title className="sectionTitle" level={3}>
            MY SLOTS
            <div>
              <Button
                onClick={getData}
                icon={<RedoOutlined />}
                style={{ margin: "0 7px 0 0" }}
              >
                Refresh
              </Button>
              <LecturerCreateSlotBtn
                getData={getData}
                setCreatedSlotView={setCreatedSlotView}
              />
            </div>
          </Title>
          {/* Tabs */}
          <Spin spinning={loading} tip="Preparing Data...">
            <div className="createdSlotTabs">
              <Tabs defaultActiveKey="1" items={tabsObj} />
            </div>
          </Spin>
        </>
      )}
    </div>
  );
};
