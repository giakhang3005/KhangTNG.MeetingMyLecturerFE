import { React, useState, useEffect } from "react";
import { Table, Typography, Tag } from "antd";
import axios from "axios";

export function StudentsManage() {
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
  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
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
    // {
    //   key: "9",
    //   title: "Status",
    //   render: (student) => {
    //     return student.status ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">DISABLED</Tag>
    //   }
    // },
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
