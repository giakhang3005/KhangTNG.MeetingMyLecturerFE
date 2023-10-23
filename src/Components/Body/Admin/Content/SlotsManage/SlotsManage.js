import { React, useState, useEffect } from "react";
import { Table, Typography, Tag, Popover, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useArray } from "../../../../../Hooks/All/useArray";

export function SlotsManage() {
  const { Title } = Typography;
  const ArrayToString = useArray();

  const [slotList, setSlotList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Aslots") !== null &&
      localStorage.getItem("Aslots") !== undefined
    ) {
      setHideLoading(true);
      setSlotList(JSON.parse(localStorage.getItem("Aslots")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/slot")
      .then(
        (response) => (
          setSlotList(response.data.data),
          localStorage.setItem("Aslots", JSON.stringify(response.data.data))
        )
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };
  useEffect(() => {
    getData();
  }, []);

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

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Date",
      dataIndex: "meetingDay",
    },
    {
      key: "3",
      title: "Start",
      dataIndex: "startTime",
    },
    {
      key: "4",
      title: "End",
      dataIndex: "endTime",
    },
    {
      key: "5",
      title: "Location",
      // dataIndex: "startTime",
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
      title: "Status",
      render: (slot) => {
        return slot.status ? (
          <Tag color="green">Avaiable</Tag>
        ) : (
          <Tag color="red">Unavaiable</Tag>
        );
      },
    },
    {
      key: "8",
      title: "Lecturer",
      dataIndex: "lecturerName",
    },
    {
      key: "9",
      title: "Student",
      dataIndex: "studentName",
    },
    {
      key: "10",
      title: "Subject",
      render: (slot) => {
        return (
          <Popover
            content={slot.slotSubjectDTOS.map((subject, i) => {
              return i === slot.slotSubjectDTOS.length - 1 ? (
                subject.subjectCode
              ) : (
                <>{subject.subjectCode}, </>
              );
            })}
          >
            <Tag color="volcano">{slot.slotSubjectDTOS.length} Subjects</Tag>
          </Popover>
        );
      },
    },
    {
      key: "11",
      title: "Password",
      dataIndex: "password",
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        SLOTS
        <Button
          disabled={loading}
          loading={hideLoading}
          icon={<ReloadOutlined />}
          onClick={getData}
          style={{ margin: "0 5px 0 0" }}
        >
          {hideLoading ? "Checking for updates..." : "Refresh"}
        </Button>
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={slotList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
