import { React, useState, useEffect } from "react";
import {
  Typography,
  Table,
  Row,
  Col,
  Button,
  message,
  Tag,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import axios from "axios";

export function PublicLocations({ setMenuOpt, setLocationEdit }) {
  const { Title, Text } = Typography;
  const [otherLoading, setOtherLoading] = useState(false);

  //! Get
  const [locations, setLocations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);

  const getData = () => {
    if (
      localStorage.getItem("Alocations") !== null &&
      localStorage.getItem("Alocations") !== "undefined"
    ) {
      setHideLoading(true);
      setLocations(JSON.parse(localStorage.getItem("Alocations")));
    } else {
      setLoading(true);
    }
    axios
      .get("https://meet-production-52c7.up.railway.app/api/location")
      .then(
        (response) => (
          setLocations(response.data.data),
          localStorage.setItem("Alocations", JSON.stringify(response.data.data))
        )
      )
      .catch((error) => console.error(error))
      .finally(() => (setLoading(false), setHideLoading(false)));
  };

  useEffect(() => {
    getData();
  }, []);

  //! Delete
  const handleDelete = (location) => {
    setOtherLoading(true);
    axios
      .delete(
        `https://meet-production-52c7.up.railway.app/api/location/delete?id=${location.id}`
      )
      .then(() => {
        message.success("Deleted successfully");
        setOtherLoading(false);
        getData();
      })
      .catch((err) => {
        console.error(err);
        setOtherLoading(false);
      });
  };

  //! Edit
  const handleEdit = (location) => {
    setLocationEdit(location);
    setMenuOpt("editLocationsManage");
  };

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
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "4",
      title: "",
      render: (location) => {
        return location.status ? (
          <Tag color="green">PUBLIC</Tag>
        ) : (
          <Tag color="orange">PERSONAL</Tag>
        );
      },
    },
    {
      key: "5",
      label: "",
      render: (location) => {
        return (
          <>
            <Button
              onClick={() => handleEdit(location)}
              type="text"
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              placement="left"
              description="Are you sure want to delete this location?"
              onConfirm={() => handleDelete(location)}
            >
              <Button type="text" icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Title className="sectionTitle" level={3}>
        LOCATIONS
        <span>
          <Button
            style={{ margin: "0 5px 0 0" }}
            disabled={isLoading || otherLoading}
            loading={hideLoading}
            icon={<ReloadOutlined />}
            onClick={getData}
          >
            {hideLoading ? "Checking for updates..." : "Refresh"}
          </Button>
          <Button
          type="primary"
            icon={<PlusOutlined />}
            onClick={() => setMenuOpt("addLocationsManage")}
            disabled={isLoading || otherLoading}
          >
            Add Location
          </Button>
        </span>
      </Title>
      {/* Table of result */}
      <Row style={{ overflow: "scroll" }}>
        <Col xs={24}>
          <Table
            className="tableOfLocations"
            columns={columns}
            dataSource={locations}
            loading={isLoading || otherLoading}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </>
  );
}
