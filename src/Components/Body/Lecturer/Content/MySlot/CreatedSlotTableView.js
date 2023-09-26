import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Typography, Table } from "antd";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const CreatedSlotTableView = () => {

    //fetching data
//   const {
//     data: SlotList, //assign name for the data
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery(["locations"], () => {
//     return fetch("").then((res) => res.json()); //fetching and turn it into json
//   });

    const columns = [
        {
          key: "1",
          title: "Start Time",
          //location.id
          dataIndex: "startTime",
        },
        {
          key: "2",
          title: "End Time",
          dataIndex: "endTime",
        },
        {
          key: "3",
          title: "Location",
          dataIndex: "location",
        },
        {
            key: "4",
            title: "Password",
            dataIndex: "password",
          },
          {
            key: "5",
            title: "Status",
            dataIndex: "status",
          },
        {
          key: "6",
          title: "",
          render: (slot) => {
            return (
              <>
                <EditOutlined onClick={() => editSlot(slot)} />
                <DeleteOutlined
                  className="locationDeleteBtn"
                  onClick={() => deleteSlot(slot)}
                />
              </>
            );
          },
        },
      ];

      //handle edit slot
      const editSlot = (slot) => {

      };

      //handle delete click
  const deleteSlot = (location) => {
    //! Place fetching DELETE API here

  };

    return (
        <>
            <Table
        className="tableOfLocations"
        columns={columns}
        // dataSource={SlotList}
        // loading={isLoading}
        rowKey="id"
      ></Table>
        </>
    )
};
