import { Button, Table, Typography } from "antd";

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
  ];

  //test data
  const upcommingMeetings = [
    {
      id: 1,
      lecturer: "Truong Nguyen Gia Khang (K17 HCM)",
      date: "03/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: "SWT301",
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
