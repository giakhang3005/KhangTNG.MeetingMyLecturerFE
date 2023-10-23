import { message, Popconfirm, Popover, Table, Tag } from "antd";
import { useState } from "react";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useSlotLecturer } from "../../../../../Hooks/Lecturer/useSlotLecturer";

export const CreatedSlotTableView = (props) => {
  const setCreatedSlotView = props.setCreatedSlotView,
    setEditingSlot = props.setEditingSlot,
    slots = props.slots,
    getData = props.getData;

  const { LecturerEditSlotFunction, LecturerDeleteSlotFunction } =
    useSlotLecturer();

  const ArrayToString = useArray();

  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   //location.id
    //   dataIndex: "id",
    // },
    {
      key: "2",
      title: "Date",
      //location.id
      dataIndex: "meetingDay",
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
      render: (slot) => {
        return (
          <Popover content={slot.locationAddress}>{slot.locationName}</Popover>
        );
      },
    },
    {
      key: "6",
      title: "Mode",
      render: (slot) => {
        return convertMode(slot.mode);
      },
    },
    {
      key: "7",
      title: "Student",
      dataIndex: "studentName",
    },
    {
      key: "8",
      title: "Subject",
      // dataIndex: 'subject',
      render: (slot) => {
        return (
          <Popover
            content={slot.slotSubjectDTOS.map((subject) => {
              return <Tag color="volcano">{subject.subjectCode}</Tag>;
            })}
          >
            <Tag color="volcano">{slot.slotSubjectDTOS?.length} Subjects </Tag>
          </Popover>
        );
      },
    },
    {
      key: "9",
      title: "Password",
      dataIndex: "password",
    },
    {
      key: "10",
      title: "",
      render: (slot) => {
        return (
          <>
            <EditOutlined
              style={{ margin: "0 5px 0 0" }}
              onClick={() =>
                handleClickEdit(slot, setCreatedSlotView, setEditingSlot)
              }
            />
            <Popconfirm
              placement="left"
              title="Are you sure want to delete this slot?"
              onConfirm={() => handleClickDelete(slot)}
            >
              <DeleteOutlined
                className="locationDeleteBtn"
                style={{ margin: 0 }}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  //conver mode
  const convertMode = (mode) => {
    switch (mode) {
      case 0:
        return "Manual Approve";
      case 1:
        return "Accept the first booker";
      case 2:
        return "Assign Student";
    }
  };

  //* Antispam handler
  //count click
  const [clickEdit, setClickEdit] = useState(0);
  const [clickDelete, setClickDelete] = useState(0);

  //cooldown 3s if user click over 2 times
  setTimeout(() => {
    clickEdit > 0 && setClickEdit(clickEdit - 1);
    clickDelete > 0 && setClickDelete(clickDelete - 1);
  }, 3000);

  //check spam for edit
  const handleClickEdit = (slot) => {
    clickEdit === 2 && message.error("Please try again after 3 seconds");
    clickEdit < 3 && setClickEdit(clickEdit + 1);
    if (clickEdit < 2) {
      LecturerEditSlotFunction(slot, setCreatedSlotView, setEditingSlot);
    }
  };

  //check spam for delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleClickDelete = (slot) => {
    clickDelete === 2 && message.error(`Please try again after 3 seconds`);
    clickDelete < 3 && setClickDelete(clickDelete + 1);
    if (clickDelete < 2) {
      LecturerDeleteSlotFunction(slot, setDeleteLoading, getData);
    }
  };

  return (
    <div className="tableviewcontainer">
      <Table
        className="tableOfLocations"
        loading={deleteLoading}
        columns={columns}
        dataSource={slots}
        rowKey="id"
      ></Table>
    </div>
  );
};
