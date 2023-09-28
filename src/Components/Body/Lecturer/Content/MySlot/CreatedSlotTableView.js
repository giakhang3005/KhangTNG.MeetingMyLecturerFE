import { Button, Typography, Table } from "antd";
import { useState } from "react";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
    LecturerEditSlotFunction,
    LecturerDeleteSlotFunction,
  } from "./CalenderSlotViewFunction";

export const CreatedSlotTableView = (props) => {
    const setCreatedSlotView = props.setCreatedSlotView,
    setEditingSlot = props.setEditingSlot;
  //fetching data
  //   const {
  //     data: SlotList, //assign name for the data
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useQuery(["locations"], () => {
  //     return fetch("").then((res) => res.json()); //fetching and turn it into json
  //   });

  //API
  const [SlotList, setSlotList] = useState([]);
  //! Fetching API slot from date to date of user here

  const columns = [
    {
      key: "1",
      title: "ID",
      //location.id
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Date",
      //location.id
      dataIndex: "date",
    },
    {
      key: "3",
      title: "Start Time",
      //location.id
      dataIndex: "startTime",
    },
    {
      key: "4",
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      key: "5",
      title: "Location",
      dataIndex: "location",
    },
    {
      key: "6",
      title: "Student",
      dataIndex: "student",
    },
    {
        key: "7",
        title: "Subject",
        // dataIndex: 'subject',
        render: (slot) => {
            return (
                <>
                    {slot.subject.map((subject) => `${subject}, `)}
                </>
            )
        }
      },
    {
      key: "8",
      title: "Password",
      dataIndex: "password",
    },
    {
      key: "9",
      title: "",
      render: (slot) => {
        return (
          <>
            <EditOutlined onClick={() => LecturerEditSlotFunction(slot, setCreatedSlotView, setEditingSlot)} />
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
  const editSlot = (slot) => {};

  //handle delete click
  const deleteSlot = (slot) => {
    //! Place fetching DELETE API here
  };

  //test data
  const slotList = [
    {
      id: 1,
      date: "30/09/2023",
      startTime: "10:00",
      endTime: "11:00",
      mode: 'Manual approve' ,
      location: "FPT",
      student: null,
      subject: ["SWP391", "SWT301"],
      password: null,
    },
    {
      id: 2,
      date: "27/09/2023",
      startTime: "14:00",
      endTime: "16:30",
      mode: 'Assign student' ,
      location: "FPT",
      student: "Tran Cong Lam (K17 HCM)",
      subject: ["SWP391", "SWT301"],
      password: "12345",
    },
    {
      id: 3,
      date: "30/09/2023",
      startTime: "15:00",
      endTime: "17:30",
      mode: 'Accept the first Booker' ,
      location: "FPT",
      student: "",
      subject: ["SWT301"],
      password: "12345",
    },
  ];
  
  return (
    <div className="tableviewcontainer">
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={slotList}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </div>
  );
};
