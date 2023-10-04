import { Button, Table, Typography } from "antd";
import { Accept, Decline, Pending } from "../RequestsSent/RequestStatusTag";
import { ArrayToString } from "../../../../../ExtendedFunction/ArrayToString";

import React from "react";

export function Upcomming() {
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
      title: "Time",
      render: (meeting) => {
        return (
          <>
            {meeting.date} ({meeting.startTime} - {meeting.endTime})
          </>
        );
      },
    },
    {
      key: "6",
      title: "Subject",
      render: (booking) => {
        return ArrayToString(booking.subject)
      },
    },
    {
      key: "7",
      title: "Location",
      render: (meeting) => {
        return (
          <>
            {meeting.location.name} ({meeting.location.address})
          </>
        );
      },
    },
    {
      key: "8",
      title: "Your note",
      dataIndex: "note",
    },
    {
      key: "9",
      title: "Status",
      render: (meeting) => {
        switch (meeting.status.toLowerCase()) {
          case "accept":
            return <Accept />;
          case "decline":
            return <Decline />;
          default:
            return <Pending />;
        }
      },
    },
  ];

  //test data
  const upcommingMeetings = [
    {
      id: 1,
      lecturer: "Truong Nguyen Gia Khang",
      date: "05/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: ["SWT301"],
      note: "hello teacher",
      status: "accept",
      location: {
        name: "FPT",
        address: "Khu cong nghe cao, quan 9, TP Thu Duc",
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        UPCOMMING MEETINGS
      </Title>

      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={upcommingMeetings}
        // loading={isLoading}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
