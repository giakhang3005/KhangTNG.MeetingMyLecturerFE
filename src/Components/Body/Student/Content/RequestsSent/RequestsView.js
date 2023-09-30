import React from "react";
import { Typography, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Accept, Decline, Pending } from "./RequestStatusTag";

export const  RequestsView = (props) => {
  const setIsSelectedBooking = props.setIsSelectedBooking;
  const { Title } = Typography;
  //table variables
  const columns = [
    {
      key: "1",
      title: "ID",
      //location.id
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Lecturer",
      dataIndex: "lecturer",
    },
    {
      key: "3",
      title: "Date",
      dataIndex: "date",
    },
    {
      key: "4",
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      key: "5",
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      key: "6",
      title: "Subject",
      dataIndex: "subject",
    },
    {
      key: "7",
      title: "Note",
      dataIndex: "note",
    },
    {
      key: "8",
      title: "Status",
      render: (booking) => {
        switch (booking.status.toLowerCase()) {
          case "accept":
            return <Accept />;
          case "decline":
            return <Decline />;
          default:
            return <Pending />;
        }
      },
    },
    {
      key: "9",
      title: "",
      render: (booking) => {
        return (
          <>
            <EditOutlined onClick={() => editBooking(booking)} />
            <DeleteOutlined
              className="locationDeleteBtn"
              onClick={() => deleteBooking(booking)}
            />
          </>
        );
      },
    },
  ];

  //handle edit
  const editBooking = (booking) => {
    //only let student edit when it is pending
    if (booking.status === "pending") {
      setIsSelectedBooking(booking)
    } else {
      message.error("You can only edit a pending requests!");
    }
  };

  //handle delete
  const deleteBooking = (booking) => {
    //only let student delete when it is pending
    if (booking.status === "pending") {
        message.success(`Deleted booking request for slot ${booking.date} ${booking.startTime} - ${booking.endTime}`);
    } else {
      message.error("You can only delete a pending requests!");
    }
  };

  const RequestsSent = [
    {
      id: 1,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWT301",
      note: "test",
      status: "pending",
    },
    {
      id: 2,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWT301",
      note: null,
      status: "decline",
    },
    {
      id: 3,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWT301",
      note: "hello teacher",
      status: "accept",
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS SENT
      </Title>
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={RequestsSent}
        // loading={isLoading}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
