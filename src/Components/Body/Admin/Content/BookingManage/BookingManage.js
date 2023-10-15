import { React, useState, useEffect } from "react";
import { Table, Typography, Tag } from "antd";
import axios from "axios";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function BookingManage() {
  const ArrayToString = useArray()
  const {Accept, Decline, Pending} = useStudentRequests()
  const { Title } = Typography;

  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get('https://meet-production-52c7.up.railway.app/api/booking')
    .then((response) => setBookingList(response.data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, [])

  

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
      title: "Booker",
      dataIndex: "studentName",
    },
    {
      key: "6",
      title: "Lecturer",
      dataIndex: "lecturerName",
    },
    {
      key: "7",
      title: "Status",
      render: (booking) => {
        switch (booking.status) {
          case 0: return <Decline />;
          case 1: return <Pending />;
          case 2: return <Accept />;
        }
      }
    },
    {
      key: "8",
      title: "Note",
      dataIndex: "note",
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        BOOKINGS
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={bookingList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  )
}
