import { React, useState, useEffect } from "react";
import { Table, Typography, Tag } from "antd";
import axios from "axios";
import { useArray } from "../../../../../Hooks/All/useArray";

export function SlotsManage() {
  const { Title } = Typography;
  const ArrayToString = useArray()

  const [slotList, setSlotList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get('https://meet-production-52c7.up.railway.app/api/v1/slot/get')
    .then((response) => setSlotList(response.data.data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, [])

  const convertMode = (mode) => {
    switch (mode) {
      case 0: return 'Manual Approve'
      case 1: return 'Accept the first booker'
      case 2: return 'Assign Student'
    }
  }

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Date",
      dataIndex: "meetingDate",
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
      title: "Mode",
      render: (slot) => {
        return convertMode(slot.mode)
      }
    },
    {
      key: "6",
      title: "Status",
      render: (slot) => {
        return slot.status ? <Tag color="green">Avaiable</Tag> : <Tag color="red">Unavaiable</Tag>
      }
    },
    {
      key: "7",
      title: "Lecturer",
      dataIndex: "lecturerName",
    },
    {
      key: "8",
      title: "Subject",
      render: (slot) => {
        return ArrayToString(slot.subjectCode)
      }
    },
    // {
    //   key: "7",
    //   title: "Curriculum",
    //   dataIndex: "curriculum",
    // },
    // {
    //   key: "8",
    //   title: "Semester",
    //   dataIndex: "semester",
    // },
    // {
    //   key: "8",
    //   title: "Address",
    //   dataIndex: "address",
    // },
    // {
    //   key: "9",
    //   title: "Status",
    //   render: (student) => {
    //     return student.status ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">DISABLED</Tag>
    //   }
    // },
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
