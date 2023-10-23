import { useContext, useState, useEffect } from "react";
import { Data } from "../../../Body";
import { LecturerCreateSlotBtn } from "./LecturerCreateSlotBtn";
import { LectuerCalenderView } from "./CreatedSlotCalenderView";
import { CreatedSlotTableView } from "./CreatedSlotTableView";
import "../../Lecturer.css";
import { EditingSlot } from "./EditingSlot";
import { CreatingSlot } from "./CreatingSlot";
import { Typography, Tabs, Spin, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
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
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if(localStorage.getItem('slots') !== null && localStorage.getItem('slots') !== undefined) {
      setSlots(JSON.parse(localStorage.getItem("slots")));
      setHideLoading(true);
    } else {
      setLoading(true);
    }
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/v1/slot/lecturer?id=${user.id}`
      )
      .then(
        (response) => (
          setSlots(response.data.data),
          localStorage.setItem("slots", JSON.stringify(response.data.data))
        )
      )
      .catch((error) => console.log(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
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
          getData={getData}
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
          getData={getData}
        />
      ),
    },
  ];

  return (
    <div>
      {/* <CreatingSlot setCreatedSlotView={setCreatedSlotView} /> */}
      {/* Edit view */}
      {createdSlotView === "create" ? (
        <CreatingSlot
          setCreatedSlotView={setCreatedSlotView}
          getData={getData}
        />
      ) : createdSlotView === "edit" ? (
        <EditingSlot
          editingSlot={editingSlot}
          setCreatedSlotView={setCreatedSlotView}
          getData={getData}
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
                loading={hideLoading}
              >
                {hideLoading ? "Checking for updates" : "Refresh"}
              </Button>
              <LecturerCreateSlotBtn
                getData={getData}
                setCreatedSlotView={setCreatedSlotView}
              />
            </div>
          </Title>
          {/* Tabs */}
          <Spin spinning={loading} tip="First loading may take some times...">
            <div className="createdSlotTabs">
              <Tabs defaultActiveKey="1" items={tabsObj} />
            </div>
          </Spin>
        </>
      )}
    </div>
  );
};
