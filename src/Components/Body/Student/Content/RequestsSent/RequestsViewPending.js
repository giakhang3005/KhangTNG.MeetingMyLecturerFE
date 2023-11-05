import {React, useEffect, useState} from "react";
import { Typography, Table} from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewPending(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView,
    requestsList = props.requestsList;

  const { Title } = Typography;

  const { tableColumn, FilterList } = useStudentRequests()
  const [pendingList, setPendingList] = useState([])
  useEffect(() => {
    FilterList(requestsList, 1, setPendingList)
  }, [requestsList])

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);

  return (
    <>
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={pendingList}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
