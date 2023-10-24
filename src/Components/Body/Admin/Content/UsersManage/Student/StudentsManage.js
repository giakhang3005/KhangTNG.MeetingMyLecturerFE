import { React, useState, useEffect } from "react";
import { Table, Typography, Button } from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";

export function StudentsManage({ setStudentEdit, setMenuOpt }) {
  const { Title } = Typography;

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const getData = () => {
    if (
      localStorage.getItem("Astudents") !== null &&
      localStorage.getItem("Astudents") !== "undefined"
    ) {
      setHideLoading(true);
      setStudentList(JSON.parse(localStorage.getItem("Astudents")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/v1/student/all")
      .then(
        (response) => (setStudentList(response.data.data),
        localStorage.setItem("Astudents", JSON.stringify(response.data.data)))
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };
  useEffect(() => {
    getData();
  }, []);

  //Handle Edit
  const handleEdit = (student) => {
    setStudentEdit(student);
    setMenuOpt("editStudent");
  };

  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "MSSV",
      dataIndex: "code",
    },
    {
      key: "3",
      title: "DOB",
      dataIndex: "dob",
    },
    {
      key: "4",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "5",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "7",
      title: "Curriculum",
      dataIndex: "curriculum",
    },
    {
      key: "8",
      title: "Major",
      dataIndex: "majorName",
    },
    {
      key: "9",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "10",
      label: "",
      render: (student) => {
        return (
          <>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(student)}
            ></Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        STUDENTS
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
        dataSource={studentList}
        loading={loading}
        rowKey="id"
      ></Table>
    </>
  );
}
