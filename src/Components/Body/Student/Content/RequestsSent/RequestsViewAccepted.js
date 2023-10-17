import {React, useEffect, useState} from "react";
import { Table} from "antd";
import { useStudentRequests } from "../../../../../Hooks/Student/useStudentRequests";

export function RequestsViewAccepted(props) {
  const setIsSelectedBooking = props.setIsSelectedBooking,
    setRequestsView = props.setRequestsView,
    requestsList = props.requestsList;

  const { tableColumn, FilterList } = useStudentRequests()
  const [acceptList, setAcceptList] = useState([])
  useEffect(() => {
    FilterList(requestsList, 2, setAcceptList)
  }, [])

  //columns for table
  const columns = tableColumn(setRequestsView, setIsSelectedBooking);

  return (
    <>
      {/* Table of result */}
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={acceptList}
        rowKey="id"
        key="key"
      ></Table>
    </>
  );
}
