import { React, useEffect, useState } from "react";
import { Table, Typography, Tag, Popover, Button } from "antd";
import { EditOutlined } from '@ant-design/icons'
import { useArray } from "../../../../../../Hooks/All/useArray";
import axios from "axios";

export function LecturersManage({setlecturerEdit, setMenuOpt}) {
  const { Title } = Typography;
  const ArrayToString = useArray();

  //Fetching
  const [loading, setLoading] = useState(false);
  const [lecturerList, setLecturerList] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/lecturer")
      .then((response) => (setLecturerList(response.data), setLoading(false)))
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    getData();
  }, []);

  //handle Edit
  const handleEdit = (lecturer) => {
    setlecturerEdit(lecturer)
    setMenuOpt("editLecturers")
  }

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
        const subjectCodeList = lecturer.subjectList.map((subject) => {
          return subject.subjectCode;
        });
        return ArrayToString(subjectCodeList);
      },
    },
    {
      key: "6",
      title: "Location",
      render: (lecturer) => {
        return lecturer.locationList.map((location, i) => {
          return (
            <Popover key={i} content={location.locationAddress}>
              <Tag color="orange">{location.locationName}</Tag>
            </Popover>
          );
        });
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
