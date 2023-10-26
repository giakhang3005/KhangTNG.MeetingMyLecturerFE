import { React, useState, useEffect } from "react";
import { Table, Typography, Popover, Tag, Button } from "antd";
import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function BookingManage() {
  const ArrayToString = useArray();
  const { Accept, Decline, Pending } = useStudentRequests();
  const { Title } = Typography;

  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Abooking") !== null &&
      localStorage.getItem("Abooking") !== "undefined"
    ) {
      setHideLoading(true);
      setBookingList(JSON.parse(localStorage.getItem("Abooking")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/booking")
      .then(
        (response) => (
          setBookingList(response.data),
          localStorage.setItem("Abooking", JSON.stringify(response.data))
        )
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Date",
      render: (booking) => {
        return <>{booking.slotInfo?.meetingDate}</>;
      },
    },
    {
      key: "3",
      title: "Start",
      render: (booking) => {
        return <>{booking.slotInfo?.startTime}</>;
      },
    },
    {
      key: "4",
      title: "End",
      render: (booking) => {
        return <>{booking.slotInfo?.endTime}</>;
      },
    },
    {
      key: "5",
      title: "Booker",
      render: (booking) => {
        return <>{booking.studentInfo?.studentName}</>;
      },
    },
    {
      key: "6",
      title: "Lecturer",
      render: (booking) => {
        return <>{booking.slotInfo?.lecturerName}</>;
      },
    },
    {
      key: "7",
      title: "Location",
      render: (booking) => {
        return (
          <Popover content={booking.slotInfo?.locationAddress}>
            <Tag color="volcano">{booking.slotInfo?.locationName}</Tag>
          </Popover>
        );
      },
    },
    {
      key: "8",
      title: "Subject",
      render: (booking) => {
        let subjectList = [];
        booking.subjectSlot?.map((subject) => {
          subjectList.push(subject.subjectCode);
        });

        return ArrayToString(subjectList);
      },
    },
    {
      key: "9",
      title: "Status",
      render: (booking) => {
        if (booking.toggle) {
          switch (booking.status) {
            case 0:
              return <Decline />;
            case 1:
              return <Pending />;
            case 2:
              return <Accept />;
          }
        } else {
          return <Tag color="red" style={Object.assign({fontWeight: 700})} icon={<DeleteOutlined />}>DELETED</Tag>;
        }
      },
    },
    {
      key: "10",
      title: "Note",
      dataIndex: "note",
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        BOOKINGS
        <Button
          disabled={loading}
          loading={hideLoading}
          icon={<ReloadOutlined />}
          onClick={getData}
        >
          {hideLoading ? "Checking for updates..." : "Refresh"}
        </Button>
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={bookingList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
