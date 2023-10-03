import React from "react";
import { Typography, Table, message, Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { Accept, Decline, Pending } from "./RequestStatusTag";
import { tableColumn } from "./RequestsFunction";

export function RequestsViewPending(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView;
  const { Title } = Typography;

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
      status: "pending",
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
