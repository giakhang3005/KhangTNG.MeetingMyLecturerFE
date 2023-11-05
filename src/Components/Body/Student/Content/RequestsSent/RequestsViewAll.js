import React from "react";
import { Typography, Table } from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewAll(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView,
    requestsList = props.requestsList;

  const { Title } = Typography;

  const { tableColumn } = useStudentRequests()

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);
  return (
    <>
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={requestsList}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
