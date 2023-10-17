import {React, useEffect, useState} from "react";
import { Table} from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewDeclined(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView,
    requestsList = props.requestsList;

  const { tableColumn, FilterList } = useStudentRequests()
  const [declineList, setDeclineList] = useState([])
  useEffect(() => {
    FilterList(requestsList, 0, setDeclineList)
  }, [])

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);

  return (
    <>
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={declineList}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
