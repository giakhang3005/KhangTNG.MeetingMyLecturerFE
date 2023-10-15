import React from "react";
import { Typography, Table} from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewAccepted(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;
  const { Title } = Typography;
  const { tableColumn} = useStudentRequests()

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);

  //test data
  const RequestsSent = [
    {
      id: 3,
      lecturer: "Truong Nguyen Gia Khang",
      date: "01/10/2023",
      startTime: "13:30",
      endTime: "15:00",
      subject: ["SWT301"],
      note: "hello teacher",
      status: 2,
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
