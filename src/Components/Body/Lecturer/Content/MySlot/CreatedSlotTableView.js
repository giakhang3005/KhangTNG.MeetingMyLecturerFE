import { message, Popconfirm, Popover, Table, Tag, Row, Col } from "antd";
import { useState } from "react";
import {
  PlusCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useArray } from "../../../../../Hooks/All/useArray";
import { useSlotLecturer } from "../../../../../Hooks/Lecturer/useSlotLecturer";
import { GooglemeetLogo } from "../../../../../Hooks/All/SVG";

export const CreatedSlotTableView = (props) => {
  const setCreatedSlotView = props.setCreatedSlotView,
    setEditingSlot = props.setEditingSlot,
    slots = props.slots,
    getData = props.getData;

  const { LecturerEditSlotFunction, LecturerDeleteSlotFunction } =
    useSlotLecturer();

  const ArrayToString = useArray();

  //convert status
  const convertStatus = (status) => {
    switch (status) {
      case true:
        return <Tag color="green">Available</Tag>;
      case false:
        return <Tag color="red">Not Available</Tag>;
    }
  };
  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   //location.id
    //   dataIndex: "id",
    // },
    {
      key: "2",
      title: "Meeting Date",
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
        return slot.online ? (
          <a href={`https://${slot.linkMeet}`} target="_blank">
            <Tag
              style={Object.assign(
                { display: "flex" },
                { alignItems: "center" },
                { width: "106px" },
                { justifyContent: "space-between" },
                { cursor: "pointer" }
              )}
              icon={<GooglemeetLogo />}
              color="geekblue"
            >
              Google Meet
            </Tag>
          </a>
        ) : (
          <Popover content={slot.locationAddress}>
            <Tag color="green">{slot.locationName}</Tag>
          </Popover>
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
      render: (slot) =>
        slot.studentName === null ? (
          ""
        ) : (
          <Popover
            title="Other Informations"
            content={
              slot.studentName !== "" && slot.studentName !== null ? (
                <span
                  style={Object.assign(
                    { lineHeight: "30px" },
                    { minWidth: "300px" }
                  )}
                >
                  {/* Email */}
                  <Row style={{ width: "300px" }}>
                    <Col xs={7}>
                      <b>Email:</b>
                    </Col>
                    <Col xs={17}> {slot.studentEmail} </Col>
                  </Row>
                  {/* Email */}
                  <Row style={{ width: "300px" }}>
                    <Col xs={7}>
                      <b>Phone:</b>
                    </Col>
                    <Col xs={17}> {slot.studentPhone} </Col>
                  </Row>
                </span>
              ) : (
                ""
              )
            }
          >
            <Tag>{slot.studentName}</Tag>
          </Popover>
        ),
    },
    {
      key: "8",
      title: "Subject",
      // dataIndex: 'subject',
      render: (slot) => {
        return slot.studentName !== null ? (
          <Tag color="volcano">{slot.subject} </Tag>
        ) : (
          slot.slotSubjectDTOS.map((subject, i) => {
            return <Tag color="volcano" key={i} style={{margin:'0 0 2px 0'}}>{subject.subjectCode}</Tag>;
          })
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
      title: "Status",
      render: (slot) => {
        return convertStatus(slot.status);
      },
    },
    {
      key: "11",
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
