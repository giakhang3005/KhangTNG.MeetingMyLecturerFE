import { React, useState, useEffect } from "react";
import { Table, Typography, Button } from "antd";
import {EditOutlined} from '@ant-design/icons'
import axios from "axios";

export function StudentsManage({setStudentEdit, setMenuOpt}) {
  const { Title } = Typography;

  const [lecturerList, setLecturerList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get('https://meet-production-52c7.up.railway.app/api/v1/student/get')
    .then((response) => setLecturerList(response.data.data))
    .catch((error) => console.error(error))
    .finally(() =>setLoading(false))
  }, [])

  //Handle Edit
  const handleEdit = (student) => {
    setStudentEdit(student)
    setMenuOpt('editStudent')
  }

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
      title: "Semester",
      dataIndex: "semester",
    },
    {
      key: "8",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "9",
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
