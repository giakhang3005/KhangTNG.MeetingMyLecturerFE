import React from "react";
import { Typography, Table } from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewAll(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;
  const { Title } = Typography;

  const { tableColumn } = useStudentRequests()

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);

  //test data
  const RequestsSent = [
    {
      id: 1,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: ["SWP391"],
      note: "test",
      status: 1,
      location: {
        name: "FPT",
        address: "Khu cong nghe cao, quan 9, TP Thu Duc",
      },
    },
    {
      id: 2,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: ["SWT301", "SWP391"],
      note: null,
      status: 0,
      location: {
        name: "FPT",
        address: "Khu cong nghe cao, quan 9, TP Thu Duc",
      },
    },
    {
      id: 3,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: ["SWT301"],
      note: "hello teacher",
      status: 1,
      location: {
        name: "FPT",
        address: "Khu cong nghe cao, quan 9, TP Thu Duc",
      },
    },
  ];
  return (
    <>
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
