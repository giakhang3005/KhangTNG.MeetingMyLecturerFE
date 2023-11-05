import { React, useEffect, useState } from "react";
import { Table, Typography, Tag, Popover, Button } from "antd";
import {
  ConsoleSqlOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useArray } from "../../../../../../Hooks/All/useArray";
import axios from "axios";

export function LecturersManage({ setlecturerEdit, setMenuOpt }) {
  const { Title } = Typography;
  const ArrayToString = useArray();

  //Fetching
  const [loading, setLoading] = useState(false);
  const [lecturerList, setLecturerList] = useState([]);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Alecturers") !== null &&
      localStorage.getItem("Alecturers") !== "undefined"
    ) {
      setHideLoading(true);
      setLecturerList(JSON.parse(localStorage.getItem("Alecturers")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/lecturer")
      .then(
        (response) => (
          setLecturerList(response.data),
          localStorage.setItem("Alecturers", JSON.stringify(response.data))
        )
      )
      .catch(
        (error) => (
          console.error(error), setLoading(false), setLecturerList([])
        )
      )
      .finally(() => (setLoading(false), setHideLoading(false)));
  };
  useEffect(() => {
    getData();
  }, []);

  //handle Edit
  const handleEdit = (lecturer) => {
    setlecturerEdit(lecturer);
    setMenuOpt("editLecturers");
  };

  const sum = (a, b) => a + b;

  //table columns
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "5",
      title: "Teaching",
      render: (lecturer) => {
        const subjectCodeList = lecturer.subjectList?.map((subject) => {
          return subject.subjectCode;
        });
        return (
          <Popover content={ArrayToString(subjectCodeList)}>
            <Tag color="volcano">{`${subjectCodeList?.length} subjects`}</Tag>
          </Popover>
        );
      },
    },
    {
      key: "6",
      title: "Location",
      render: (lecturer) => {
        return (
          <>
            <Tag color="orange">
              {sum(
                lecturer.locationList?.length,
                lecturer.linkMeet !== null ? 1 : 0
              )}{" "}
              {sum(
                lecturer.locationList?.length,
                lecturer.linkMeet !== null ? 1 : 0
              ) < 2
                ? "Location"
                : "Locations"}
            </Tag>
          </>
        );
      },
    },

    {
      key: "7",
      label: "",
      render: (lecturer) => {
        return (
          <>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(lecturer)}
            ></Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        LECTURERS
        <Button
          disabled={loading}
          icon={<ReloadOutlined />}
          onClick={getData}
          style={{ margin: "0 5px 0 0" }}
          loading={hideLoading}
        >
          {hideLoading ? "Checking for updates..." : "Refresh"}
        </Button>
      </Title>
      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={lecturerList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
