import { React, useState, useEffect } from "react";
import { Table, Typography, Tag, Popover } from "antd";
import axios from "axios";
import { useArray } from "../../../../../Hooks/All/useArray";

export function SlotsManage() {
  const { Title } = Typography;
  const ArrayToString = useArray();

  const [slotList, setSlotList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/slot")
      .then((response) => setSlotList(response.data.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, []);

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

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Date",
      dataIndex: "meetingDay",
    },
    {
      key: "3",
      title: "Start",
      dataIndex: "startTime",
    },
    {
      key: "4",
      title: "End",
      dataIndex: "endTime",
    },
    {
      key: "5",
      title: "Location",
      // dataIndex: "startTime",
    },
    {
      key: "6",
      title: "Mode",
      render: (slot) => {
        return convertMode(slot.mode);
      },
    },
    {
      key: "7",
      title: "Status",
      render: (slot) => {
        return slot.status ? (
          <Tag color="green">Avaiable</Tag>
        ) : (
          <Tag color="red">Unavaiable</Tag>
        );
      },
    },
    {
      key: "8",
      title: "Lecturer",
      dataIndex: "lecturerName",
    },
    {
      key: "9",
      title: "Student",
      dataIndex: "studentEmail",
    },
    {
      key: "10",
      title: "Subject",
      render: (slot) => {
        return (
          <Popover content={ArrayToString(slot.subjectCode)}>
            <Tag color="volcano">{slot.subjectCode.length} Subjects</Tag>
          </Popover>
        );
      },
    },
    {
      key: "11",
      title: "Password",
      dataIndex: "password",
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        SLOTS
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={slotList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
