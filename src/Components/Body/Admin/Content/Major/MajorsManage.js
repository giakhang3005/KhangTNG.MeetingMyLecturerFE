import { React, useState, useEffect } from "react";
import { Typography, Table, Row, Col, Button, message, Popconfirm } from "antd";
import {
  EditOutlined,
  PoweroffOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import axios from "axios";

export function MajorsManage({ setMenuOpt, setEditMajor }) {
  const { Title, Text } = Typography;

  const [loading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const [majors, setMajors] = useState([]);
  const getData = () => {
    if (
      localStorage.getItem("Amajors") !== null &&
      localStorage.getItem("Amajors") !== "undefined"
    ) {
      setHideLoading(true);
      setMajors(JSON.parse(localStorage.getItem("Amajors")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/major")
      .then(
        (res) => (
          setMajors(res.data),
          setLoading(false),
          setHideLoading(false),
          localStorage.setItem("Amajors", JSON.stringify(res.data))
        )
      )
      .catch((err) => console.error(err));
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
            {/* <Popconfirm
              placement="left"
              description="Are you sure want to delete this major?"
              onConfirm={() => handleDelete(major)}
            > */}
              <Button type="text" icon={<PoweroffOutlined />} style={{color: major.status ? "green" : "red"}} onClick={() => handleDelete(major)}></Button>
            {/* </Popconfirm> */}
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
        `https://meet-production-52c7.up.railway.app/api/major/${major.id}?status=${!major.status}`
      )
      .then(() => {
        message.success("Changed major status successfully");
        getData();
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to change major status");
        setLoading(false);
      });
  };

  //!Handle edit
  const handleEdit = (major) => {
    setEditMajor(major);
    setMenuOpt("editMajor");
  };
  return (
    <>
      <Title className="sectionTitle" level={3}>
        MAJORS
        <span>
          <Button
            disabled={loading}
            loading={hideLoading}
            icon={<ReloadOutlined />}
            onClick={getData}
            style={{ margin: "0 5px 0 0" }}
          >
            {hideLoading ? "Checking for updates...": "Refresh"}
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setMenuOpt("addMajor")}
            disabled={loading}
          >
            Add Major
          </Button>
        </span>
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
