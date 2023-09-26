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
      title: "Password",
      dataIndex: "password",
    },
    {
      key: "8",
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
  const editSlot = (slot) => {};

  //handle delete click
  const deleteSlot = (slot) => {
    //! Place fetching DELETE API here
  };

  //test data 
  const slotList = [
    {id: 1, date: '30/09/2023', startTime: '10:00', endTime: '11:00', location: 'FPT', student: 'Tran Cong Lam (K17 HCM)', password: null},
    {id: 2, date: '30/09/2023', startTime: '14:00', endTime: '16:30', location: 'FPT', student: null, password: '12345'}
  ]

  return (
    <>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={slotList}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </>
  );
};
