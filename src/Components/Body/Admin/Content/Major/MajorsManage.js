import { React, useState, useEffect } from "react";
import { Typography, Table, Row, Col, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export function MajorsManage({ setMenuOpt, setEditMajor }) {
  const { Title, Text } = Typography;

  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get("https://meet-production-52c7.up.railway.app/api/major")
      .then((res) => (setMajors(res.data), setLoading(false)));
  };

  useEffect(() => {
    getData();
  }, []);

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
      key: "5",
      label: "",
      render: (major) => {
        return (
          <>
            <Button
              onClick={() => handleEdit(major)}
              type="text"
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              description="Are you sure want to delete this major?"
              onConfirm={() => handleDelete(major)}
            >
              <Button type="text" icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  //! Handle delete
  const handleDelete = (major) => {
    setLoading(true);
    axios
      .delete(
        `https://meet-production-52c7.up.railway.app/api/major/${major.id}`
      )
      .then(() => {
        message.success("Deleted major successfully");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to delete major");
        setLoading(false);
      });
  };

  //!Handle edit
  const handleEdit = (major) => {
    setEditMajor(major);
    setMenuOpt('editMajor');
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        MAJORS
        <Button
          icon={<PlusOutlined />}
          onClick={() => setMenuOpt("addMajor")}
          disabled={loading}
        >
          Add Major
        </Button>
      </Title>
      {/* Table of result */}
      <Row style={{ overflow: "scroll" }}>
        <Col xs={24}>
          <Table
            className="tableOfLocations"
            columns={columns}
            dataSource={majors}
            loading={loading}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </>
  );
}
